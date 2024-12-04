const socket = io('http://localhost:3000'); // فرض بر این است که سرور شما در localhost:3000 در حال اجرا است.
const sendTextBtn = document.getElementById('send-text');
const sendVoiceBtn = document.getElementById('send-voice');
const sendImageBtn = document.getElementById('send-image');
const chatInput = document.getElementById('chat-input');
const chatBox = document.getElementById('chat-box');

// ارسال پیام متنی
sendTextBtn.addEventListener('click', () => {
    const message = chatInput.value;
    if (message.trim() !== "") {
        socket.emit('sendMessage', { type: 'text', content: message });
        chatInput.value = ''; // پاک کردن ورودی
    }
});

// ارسال پیام صوتی
sendVoiceBtn.addEventListener('click', () => {
    // فرض می‌کنیم ضبط صدا با استفاده از MediaRecorder انجام می‌شود.
    // فایل صوتی پس از ضبط باید در اینجا ارسال شود.
    const voiceMessage = 'voice_file_url'; // لینک یا اطلاعات فایل صوتی
    socket.emit('sendMessage', { type: 'voice', content: voiceMessage });
});

// ارسال پیام تصویری
sendImageBtn.addEventListener('click', () => {
    const imageFile = 'image_url'; // لینک یا اطلاعات تصویر
    socket.emit('sendMessage', { type: 'image', content: imageFile });
});

// دریافت پیام از ادمین یا کاربر
socket.on('receiveMessage', (message) => {
    const messageElement = document.createElement('div');
    if (message.type === 'text') {
        messageElement.classList.add('chat-message');
        messageElement.classList.add(message.sender === 'admin' ? 'admin' : 'user');
        messageElement.textContent = message.content;
    } else if (message.type === 'voice') {
        messageElement.classList.add('chat-message');
        messageElement.innerHTML = `<audio controls src="${message.content}"></audio>`;
    } else if (message.type === 'image') {
        messageElement.classList.add('chat-message');
        messageElement.innerHTML = `<img src="${message.content}" style="max-width: 100%; border-radius: 10px;"/>`;
    }
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // اسکرول به پایین هنگام دریافت پیام جدید
});
