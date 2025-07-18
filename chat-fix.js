// 修复聊天功能
document.addEventListener('DOMContentLoaded', function() {
    console.log('Chat fix script loaded');
    
    // 获取DOM元素
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!messageInput || !sendButton || !chatMessages) {
        console.error('Chat elements not found');
        return;
    }
    
    // 移除所有现有的事件监听器
    const newSendButton = sendButton.cloneNode(true);
    sendButton.parentNode.replaceChild(newSendButton, sendButton);
    
    const newMessageInput = messageInput.cloneNode(true);
    messageInput.parentNode.replaceChild(newMessageInput, messageInput);
    
    // 重新获取DOM元素
    const updatedMessageInput = document.getElementById('messageInput');
    const updatedSendButton = document.getElementById('sendButton');
    
    // 发送按钮点击事件
    updatedSendButton.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Send button clicked');
        sendChatMessage();
    });
    
    // 回车键发送消息
    updatedMessageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // 阻止默认的换行行为
            console.log('Enter key pressed');
            sendChatMessage();
        }
    });
    
    // 自动调整文本框高度
    updatedMessageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    
    // 发送消息函数
    function sendChatMessage() {
        const message = updatedMessageInput.value.trim();
        if (message) {
            console.log('Sending message:', message);
            
            // 添加用户消息
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message user';
            messageDiv.innerHTML = `
                <div class="message-avatar user">U</div>
                <div class="message-content">
                    <div class="message-text">${message}</div>
                    <div class="message-time">Just now</div>
                </div>
            `;
            chatMessages.appendChild(messageDiv);
            
            // 清空输入框
            updatedMessageInput.value = '';
            updatedMessageInput.style.height = 'auto';
            
            // 滚动到底部
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // 模拟AI正在输入
            setTimeout(() => {
                // 添加正在输入指示器
                const typingDiv = document.createElement('div');
                typingDiv.className = 'message';
                typingDiv.id = 'typing-indicator';
                typingDiv.innerHTML = `
                    <div class="message-avatar ai">G</div>
                    <div class="message-content">
                        <div class="message-text">
                            <span class="typing-dot">.</span>
                            <span class="typing-dot">.</span>
                            <span class="typing-dot">.</span>
                        </div>
                    </div>
                `;
                chatMessages.appendChild(typingDiv);
                
                // 滚动到底部
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // 一段时间后显示AI回复
                setTimeout(() => {
                    // 移除正在输入指示器
                    const typingIndicator = document.getElementById('typing-indicator');
                    if (typingIndicator) {
                        typingIndicator.remove();
                    }
                    
                    // 随机选择一个回复
                    const responses = [
                        "I understand what you're saying. Can you tell me more?",
                        "That's interesting! Let me think about that for a moment...",
                        "I see your point. Here's what I think about that...",
                        "Thanks for sharing that with me. I'd like to explore this topic further.",
                        "That's a great question! Let me provide some information about that."
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    
                    // 添加AI回复
                    const aiMessage = document.createElement('div');
                    aiMessage.className = 'message';
                    aiMessage.innerHTML = `
                        <div class="message-avatar ai">G</div>
                        <div class="message-content">
                            <div class="message-text">${randomResponse}</div>
                            <div class="message-time">Just now</div>
                        </div>
                    `;
                    chatMessages.appendChild(aiMessage);
                    
                    // 滚动到底部
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    
                    // 动画角色说话
                    const mouth = document.getElementById('mouth');
                    if (mouth) {
                        mouth.animate([
                            { d: 'path("M160,230 Q200,250 240,230")' },
                            { d: 'path("M160,240 Q200,220 240,240")' },
                            { d: 'path("M160,230 Q200,250 240,230")' }
                        ], {
                            duration: 300,
                            iterations: 5
                        });
                    }
                }, 1500);
            }, 500);
        }
    }
});