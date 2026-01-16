// TODO 데이터 저장소
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let selectedEmoji = '📝';
let selectedColor = '#7c7cff';
let currentFilter = 'all';

// DOM 요소
const memoContent = document.getElementById('memoContent');
const addMemoBtn = document.getElementById('addMemoBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const memoList = document.getElementById('memoList');
const emojiButtons = document.querySelectorAll('.emoji-btn');
const colorButtons = document.querySelectorAll('.color-btn');
const filterButtons = document.querySelectorAll('.filter-btn');

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    renderTodos();
    updateStats();
});

// 이모지 선택
emojiButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        emojiButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedEmoji = btn.dataset.emoji;
    });
});

// 색상 선택
colorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        colorButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedColor = btn.dataset.color;
    });
});

// 필터 선택
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

// TODO 추가
addMemoBtn.addEventListener('click', () => {
    const content = memoContent.value.trim();
    
    if (!content) {
        alert('할 일을 입력해주세요! 😊');
        return;
    }
    
    const todo = {
        id: Date.now(),
        content: content,
        emoji: selectedEmoji,
        color: selectedColor,
        completed: false,
        starred: false
    };
    
    todos.unshift(todo);
    saveTodos();
    renderTodos();
    updateStats();
    
    // 입력 필드 초기화
    memoContent.value = '';
    memoContent.focus();
    
    // 추가 애니메이션
    addMemoBtn.style.transform = 'scale(1.2) rotate(180deg)';
    setTimeout(() => {
        addMemoBtn.style.transform = '';
    }, 300);
});

// Enter 키로 TODO 추가
memoContent.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addMemoBtn.click();
    }
});

// 전체 삭제
clearAllBtn.addEventListener('click', () => {
    if (todos.length === 0) {
        alert('삭제할 항목이 없습니다! 📭');
        return;
    }
    
    if (confirm('정말 모든 항목을 삭제하시겠습니까? 🗑️')) {
        todos = [];
        saveTodos();
        renderTodos();
        updateStats();
    }
});

// TODO 렌더링
function renderTodos() {
    let filteredTodos = todos;
    
    // 필터 적용
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(t => t.completed);
    } else if (currentFilter === 'starred') {
        filteredTodos = todos.filter(t => t.starred);
    }
    
    if (filteredTodos.length === 0) {
        let emptyMessage = '할 일을 추가해보세요! ✨';
        if (currentFilter === 'completed') emptyMessage = '완료된 항목이 없습니다! 💪';
        if (currentFilter === 'starred') emptyMessage = '중요한 항목이 없습니다! ⭐';
        if (currentFilter === 'active') emptyMessage = '진행중인 항목이 없습니다! 🎉';
        
        memoList.innerHTML = `<div style="text-align: center; color: white; padding: 60px; font-size: 1.3rem; background: rgba(255,255,255,0.1); border-radius: 20px; backdrop-filter: blur(10px);">${emptyMessage}</div>`;
        return;
    }
    
    memoList.innerHTML = filteredTodos.map(todo => `
        <div class="todo-item ${todo.completed ? 'completed' : ''} ${todo.starred ? 'starred' : ''}" 
             data-id="${todo.id}" 
             style="border-left-color: ${todo.color};">
            <div class="todo-left">
                <div class="todo-emoji">${todo.emoji}</div>
                <div class="checkbox ${todo.completed ? 'checked' : ''}" 
                     onclick="toggleTodo(${todo.id})"
                     style="border-color: ${todo.color}; ${todo.completed ? `background: ${todo.color};` : ''}"></div>
                <div class="todo-text-wrapper">
                    <div class="todo-text" id="text-${todo.id}">${escapeHtml(todo.content)}</div>
                    <input type="text" class="todo-edit-input" id="edit-${todo.id}" value="${escapeHtml(todo.content)}" style="display: none;">
                </div>
            </div>
            <div class="todo-actions">
                <button class="btn-edit-todo" id="edit-btn-${todo.id}" onclick="editTodo(${todo.id})">
                    <svg class="edit-icon" viewBox="0 0 24 24">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                </button>
                <button class="btn-save-todo" id="save-btn-${todo.id}" onclick="saveTodo(${todo.id})" style="display: none;">
                    <svg class="save-icon" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                </button>
                <button class="btn-delete-todo" onclick="deleteTodo(${todo.id})">
                    <svg class="trash-icon" viewBox="0 0 24 24">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                </button>
                <button class="btn-star ${todo.starred ? 'starred' : ''}" onclick="toggleStar(${todo.id})">
                    <svg class="star-icon" viewBox="0 0 100 100">
                        <defs>
                            <linearGradient id="starGradient${todo.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.3" />
                                <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0" />
                            </linearGradient>
                        </defs>
                        <path class="star-bg" d="M50,15 Q52,8 54,15 L62,35 Q64,42 72,42 L92,42 Q98,42 94,48 L78,62 Q72,68 74,76 L80,96 Q82,102 76,98 L58,84 Q50,78 42,84 L24,98 Q18,102 20,96 L26,76 Q28,68 22,62 L6,48 Q2,42 8,42 L28,42 Q36,42 38,35 L46,15 Q48,8 50,15 Z" 
                              stroke-linejoin="round" stroke-linecap="round"/>
                        <path class="star-shine" d="M50,15 Q52,8 54,15 L62,35 Q64,42 72,42 L92,42 Q98,42 94,48 L78,62 Q72,68 74,76 L80,96 Q82,102 76,98 L58,84 Q50,78 42,84 L24,98 Q18,102 20,96 L26,76 Q28,68 22,62 L6,48 Q2,42 8,42 L28,42 Q36,42 38,35 L46,15 Q48,8 50,15 Z" 
                              fill="url(#starGradient${todo.id})" stroke="none"/>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
}

// 통계 업데이트
function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const starred = todos.filter(t => t.starred).length;
    
    document.getElementById('totalCount').textContent = total;
    document.getElementById('completedCount').textContent = completed;
    document.getElementById('starredCount').textContent = starred;
}

// TODO 완료/미완료 토글
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
        updateStats();
    }
}

// 별표시 토글
function toggleStar(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.starred = !todo.starred;
        saveTodos();
        renderTodos();
        updateStats();
    }
}

// TODO 삭제
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
    updateStats();
}

// TODO 수정
function editTodo(id) {
    const textElement = document.getElementById(`text-${id}`);
    const inputElement = document.getElementById(`edit-${id}`);
    const editBtn = document.getElementById(`edit-btn-${id}`);
    const saveBtn = document.getElementById(`save-btn-${id}`);
    
    // 텍스트 숨기고 입력창 보이기
    textElement.style.display = 'none';
    inputElement.style.display = 'block';
    inputElement.focus();
    inputElement.select();
    
    // 버튼 전환
    editBtn.style.display = 'none';
    saveBtn.style.display = 'block';
    
    // Enter 키로 저장
    inputElement.onkeydown = (e) => {
        if (e.key === 'Enter') {
            saveTodo(id);
        } else if (e.key === 'Escape') {
            cancelEdit(id);
        }
    };
}

// TODO 저장
function saveTodo(id) {
    const inputElement = document.getElementById(`edit-${id}`);
    const newContent = inputElement.value.trim();
    
    if (!newContent) {
        alert('내용을 입력해주세요! 😊');
        inputElement.focus();
        return;
    }
    
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.content = newContent;
        saveTodos();
        renderTodos();
        updateStats();
    }
}

// 수정 취소
function cancelEdit(id) {
    const textElement = document.getElementById(`text-${id}`);
    const inputElement = document.getElementById(`edit-${id}`);
    const editBtn = document.getElementById(`edit-btn-${id}`);
    const saveBtn = document.getElementById(`save-btn-${id}`);
    
    textElement.style.display = 'block';
    inputElement.style.display = 'none';
    editBtn.style.display = 'block';
    saveBtn.style.display = 'none';
}

// 로컬 스토리지에 저장
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// HTML 이스케이프 (XSS 방지)
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
