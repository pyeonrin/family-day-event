from PIL import Image
import numpy as np

# 입력 및 출력 파일 경로
input_path = 'family-day-logo_modi.png'
output_path = 'family-day-logo_modi_nobg.png'

print(f"FAMILY DAY 수정 로고 배경 제거 중: {input_path}")

try:
    # 이미지 열기
    img = Image.open(input_path)
    img = img.convert("RGBA")
    
    # 이미지 데이터를 numpy 배열로 변환
    data = np.array(img)
    
    # RGB 채널 추출
    red, green, blue, alpha = data.T
    
    # 배경 영역 찾기 (여러 조건으로 배경 감지)
    # 1. 흰색/밝은 회색 배경
    light_bg = (red > 200) & (green > 200) & (blue > 200)
    
    # 2. 회색 배경 (RGB 값이 비슷한 경우)
    gray_bg = (np.abs(red.astype(int) - green.astype(int)) < 20) & \
              (np.abs(green.astype(int) - blue.astype(int)) < 20) & \
              (red > 180)
    
    # 3. 매우 밝은 영역
    very_light = (red > 240) & (green > 240) & (blue > 240)
    
    # 모든 배경 조건 결합
    background_areas = light_bg | gray_bg | very_light
    
    # 배경 영역을 투명하게 만들기
    data[..., 3][background_areas.T] = 0
    
    # 결과 이미지 저장
    result_img = Image.fromarray(data)
    result_img.save(output_path)
    
    print(f"✓ 배경 제거 완료: {output_path}")
    print(f"✓ 이제 HTML 파일에서 '{output_path}'를 사용할 수 있습니다.")
    
    # 이미지 정보 출력
    print(f"원본 이미지 크기: {img.size}")
    print(f"결과 이미지 저장됨: {output_path}")
    
except FileNotFoundError:
    print(f"✗ 오류: '{input_path}' 파일을 찾을 수 없습니다.")
except ImportError:
    print("✗ 오류: PIL(Pillow) 또는 numpy 라이브러리가 설치되지 않았습니다.")
    print("다음 명령어로 설치하세요: pip install pillow numpy")
except Exception as e:
    print(f"✗ 오류 발생: {e}")