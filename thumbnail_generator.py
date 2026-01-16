import tkinter as tk
from tkinter import filedialog, messagebox, font
from PIL import Image, ImageDraw, ImageFont
import os

class ThumbnailGenerator:
    def __init__(self, root):
        self.root = root
        self.root.title("썸네일 생성기")
        self.root.geometry("500x400")
        self.root.resizable(False, False)
        
        self.image_path = None
        
        # UI 구성
        self.create_widgets()
    
    def create_widgets(self):
        # 제목
        title_label = tk.Label(self.root, text="썸네일 생성기", font=("맑은 고딕", 20, "bold"))
        title_label.pack(pady=20)
        
        # 이미지 선택 버튼
        self.select_btn = tk.Button(
            self.root, 
            text="이미지 선택", 
            command=self.select_image,
            width=20,
            height=2,
            font=("맑은 고딕", 12)
        )
        self.select_btn.pack(pady=10)
        
        # 선택된 파일 표시
        self.file_label = tk.Label(self.root, text="선택된 파일: 없음", font=("맑은 고딕", 10))
        self.file_label.pack(pady=5)
        
        # 제목 입력
        title_frame = tk.Frame(self.root)
        title_frame.pack(pady=20)
        
        tk.Label(title_frame, text="제목:", font=("맑은 고딕", 12)).pack(side=tk.LEFT, padx=5)
        self.title_entry = tk.Entry(title_frame, width=30, font=("맑은 고딕", 12))
        self.title_entry.pack(side=tk.LEFT, padx=5)
        
        # 생성 버튼
        self.generate_btn = tk.Button(
            self.root,
            text="썸네일 생성",
            command=self.generate_thumbnail,
            width=20,
            height=2,
            font=("맑은 고딕", 12, "bold"),
            bg="#4CAF50",
            fg="white"
        )
        self.generate_btn.pack(pady=20)
    
    def select_image(self):
        file_path = filedialog.askopenfilename(
            title="이미지 선택",
            filetypes=[
                ("이미지 파일", "*.jpg *.jpeg *.png *.bmp *.gif"),
                ("모든 파일", "*.*")
            ]
        )
        
        if file_path:
            self.image_path = file_path
            filename = os.path.basename(file_path)
            self.file_label.config(text=f"선택된 파일: {filename}")
    
    def generate_thumbnail(self):
        if not self.image_path:
            messagebox.showwarning("경고", "이미지를 먼저 선택해주세요!")
            return
        
        title_text = self.title_entry.get().strip()
        if not title_text:
            messagebox.showwarning("경고", "제목을 입력해주세요!")
            return
        
        try:
            # 이미지 열기
            img = Image.open(self.image_path)
            img = img.convert("RGB")
            
            # 이미지 크기
            width, height = img.size
            
            # 그리기 객체 생성
            draw = ImageDraw.Draw(img)
            
            # 폰트 설정 (시스템 폰트 사용)
            font_size = int(height * 0.08)  # 이미지 높이의 8%
            try:
                # Windows 한글 폰트
                font = ImageFont.truetype("malgun.ttf", font_size)
            except:
                try:
                    font = ImageFont.truetype("arial.ttf", font_size)
                except:
                    font = ImageFont.load_default()
            
            # 텍스트 크기 계산
            bbox = draw.textbbox((0, 0), title_text, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
            
            # 텍스트 위치 (하단 중앙)
            x = (width - text_width) / 2
            y = height - text_height - int(height * 0.05)
            
            # 배경 사각형 그리기 (반투명 효과)
            padding = 20
            rect_coords = [
                x - padding,
                y - padding,
                x + text_width + padding,
                y + text_height + padding
            ]
            draw.rectangle(rect_coords, fill=(0, 0, 0, 200))
            
            # 텍스트 외곽선 (더 선명하게)
            outline_width = 3
            for adj_x in range(-outline_width, outline_width + 1):
                for adj_y in range(-outline_width, outline_width + 1):
                    draw.text((x + adj_x, y + adj_y), title_text, font=font, fill="black")
            
            # 메인 텍스트
            draw.text((x, y), title_text, font=font, fill="white")
            
            # 저장 경로 설정
            save_path = filedialog.asksaveasfilename(
                defaultextension=".jpg",
                filetypes=[
                    ("JPEG", "*.jpg"),
                    ("PNG", "*.png"),
                    ("모든 파일", "*.*")
                ],
                initialfile="thumbnail.jpg"
            )
            
            if save_path:
                img.save(save_path, quality=95)
                messagebox.showinfo("완료", f"썸네일이 생성되었습니다!\n{save_path}")
        
        except Exception as e:
            messagebox.showerror("오류", f"썸네일 생성 중 오류가 발생했습니다:\n{str(e)}")

def main():
    root = tk.Tk()
    app = ThumbnailGenerator(root)
    root.mainloop()

if __name__ == "__main__":
    main()
