from rembg import remove
from PIL import Image
import io

# 입력 및 출력 파일 경로
input_path = 'coin_icon.png'
output_path = 'coin_icon_nobg.png'

print(f"배경 제거 중: {input_path}")

try:
    # 이미지 파일 읽기
    with open(input_path, 'rb') as input_file:
        input_data = input_file.read()
    
    # 배경 제거
    output_data = remove(input_data)
    
    # 결과 저장
    with open(output_path, 'wb') as output_file:
        output_file.write(output_data)
    
    print(f"✓ 배경 제거 완료: {output_path}")
    print(f"✓ 이제 HTML 파일에서 '{output_path}'를 사용할 수 있습니다.")
    
except FileNotFoundError:
    print(f"✗ 오류: '{input_path}' 파일을 찾을 수 없습니다.")
except Exception as e:
    print(f"✗ 오류 발생: {e}")
