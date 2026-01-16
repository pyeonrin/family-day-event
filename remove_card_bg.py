from PIL import Image
import numpy as np

# 입력 및 출력 파일 경로
input_path = 'card_icon.png'
output_path = 'card_icon_nobg.png'

print(f"흰색 배경 제거 중: {input_path}")

try:
    # 이미지 열기
    img = Image.open(input_path)
    img = img.convert("RGBA")
    
    # 이미지 데이터를 numpy 배열로 변환
    data = np.array(img)
    
    # RGB 채널 추출
    red, green, blue, alpha = data.T
    
    # 흰색 영역 찾기 (RGB 값이 모두 240 이상인 픽셀)
    white_areas = (red > 240) & (green > 240) & (blue > 240)
    
    # 흰색 영역을 투명하게 만들기
    data[..., 3][white_areas.T] = 0
    
    # 결과 이미지 저장
    result_img = Image.fromarray(data)
    result_img.save(output_path)
    
    print(f"✓ 배경 제거 완료: {output_path}")
    print(f"✓ 이제 HTML 파일에서 '{output_path}'를 사용할 수 있습니다.")
    
except FileNotFoundError:
    print(f"✗ 오류: '{input_path}' 파일을 찾을 수 없습니다.")
except ImportError:
    print("✗ 오류: PIL(Pillow) 또는 numpy 라이브러리가 설치되지 않았습니다.")
    print("다음 명령어로 설치하세요: pip install pillow numpy")
except Exception as e:
    print(f"✗ 오류 발생: {e}")
