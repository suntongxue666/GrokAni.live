// API Key Handler
// 处理API Key的保存和加载

// 提供商显示名称映射
const providerDisplayNames = {
    'openai': 'OpenAI',
    'anthropic': 'Anthropic',
    'google': 'Gemini',
    'openrouter': 'OpenRouter',
    'ollama': 'Ollama',
    'deepseek': 'DeepSeek'
};

// 提供商API Key获取链接
const apiKeyLinks = {
    'openai': 'https://platform.openai.com/api-keys',
    'anthropic': 'https://console.anthropic.com/account/keys',
    'google': 'https://makersuite.google.com/app/apikey',
    'openrouter': 'https://openrouter.ai/keys',
    'ollama': 'https://ollama.ai',
    'deepseek': 'https://platform.deepseek.com/'
};

// 保存API Key到localStorage
function saveApiKey(provider, apiKey) {
    // 保存通用设置
    localStorage.setItem('grokani_provider', provider);
    localStorage.setItem('grokani_api_key', apiKey);
    
    // 同时保存特定于提供商的API Key
    if (apiKey) {
        localStorage.setItem(provider + '_api_key', apiKey);
    }
    
    return true;
}

// 加载API Key
function loadApiKey(provider) {
    // 尝试加载特定于提供商的API Key
    const providerSpecificKey = localStorage.getItem(provider + '_api_key');
    if (providerSpecificKey) {
        return providerSpecificKey;
    }
    
    // 如果没有特定于提供商的API Key，则返回通用API Key
    return localStorage.getItem('grokani_api_key') || '';
}

// 获取提供商显示名称
function getProviderDisplayName(provider) {
    return providerDisplayNames[provider] || provider;
}

// 获取API Key获取链接
function getApiKeyLink(provider) {
    return apiKeyLinks[provider] || '#';
}

// 显示保存成功提示
function showSaveSuccessMessage() {
    // 创建提示元素
    const saveMessage = document.createElement('div');
    saveMessage.textContent = 'Settings saved successfully!';
    saveMessage.style.position = 'fixed';
    saveMessage.style.top = '20px';
    saveMessage.style.left = '50%';
    saveMessage.style.transform = 'translateX(-50%)';
    saveMessage.style.backgroundColor = '#6B46C1';
    saveMessage.style.color = 'white';
    saveMessage.style.padding = '10px 20px';
    saveMessage.style.borderRadius = '8px';
    saveMessage.style.zIndex = '1000';
    document.body.appendChild(saveMessage);
    
    // 2秒后移除提示
    setTimeout(() => {
        document.body.removeChild(saveMessage);
    }, 2000);
}

// 初始化聊天页面的API Key处理
function initChatPageApiKeyHandling() {
    // 加载保存的设置
    const savedProvider = localStorage.getItem('grokani_provider') || 'openai';
    const savedApiKey = localStorage.getItem('grokani_api_key') || '';
    
    // 设置UI元素
    const providerSelector = document.getElementById('providerSelector');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const chatTitle = document.querySelector('.chat-title');
    
    if (providerSelector) {
        providerSelector.value = savedProvider;
    }
    
    if (apiKeyInput) {
        apiKeyInput.value = savedApiKey;
    }
    
    // 更新聊天标题
    if (chatTitle && savedProvider) {
        const providerName = getProviderDisplayName(savedProvider);
        chatTitle.textContent = `Chat with GrokAni (${providerName})`;
    }
    
    // 当用户切换提供商时，自动加载对应的API Key
    if (providerSelector) {
        providerSelector.addEventListener('change', function() {
            const selectedProvider = this.value;
            // 加载特定于提供商的API Key
            const apiKey = loadApiKey(selectedProvider);
            
            if (apiKeyInput) {
                apiKeyInput.value = apiKey;
            }
            
            // 更新聊天标题
            if (chatTitle) {
                const providerName = getProviderDisplayName(selectedProvider);
                chatTitle.textContent = `Chat with GrokAni (${providerName})`;
            }
        });
    }
    
    // 保存设置按钮点击事件
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function() {
            const provider = providerSelector.value;
            const apiKey = apiKeyInput.value;
            
            // 保存API Key
            saveApiKey(provider, apiKey);
            
            // 更新聊天标题
            if (chatTitle) {
                const providerName = getProviderDisplayName(provider);
                chatTitle.textContent = `Chat with GrokAni (${providerName})`;
            }
            
            // 显示保存成功提示
            showSaveSuccessMessage();
            
            // 在移动设备上关闭侧边栏
            const sidebar = document.getElementById('sidebar');
            if (sidebar && window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        });
    }
    
    // 检查API Key是否缺失并显示警告
    if (!savedApiKey) {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            const warningMessage = document.createElement('div');
            warningMessage.className = 'message';
            warningMessage.innerHTML = `
                <div class="message-avatar ai">G</div>
                <div class="message-content">
                    <div class="message-text">⚠️ No API key detected. Please set your API key in the settings panel to use GrokAni.</div>
                    <div class="message-time">Just now</div>
                </div>
            `;
            chatMessages.appendChild(warningMessage);
            
            // 在移动设备上自动打开侧边栏
            const sidebar = document.getElementById('sidebar');
            if (sidebar && window.innerWidth <= 768) {
                sidebar.classList.add('open');
            }
        }
    }
}

// 初始化模型选择页面的API Key处理
function initModelPageApiKeyHandling() {
    // 当用户选择模型并输入API Key后，保存设置并跳转到聊天页面
    const continueButton = document.getElementById('continueButton');
    if (continueButton) {
        continueButton.addEventListener('click', function() {
            const provider = document.getElementById('providerSelector').value;
            const apiKey = document.getElementById('apiKeyInput').value;
            
            if (apiKey) {
                // 保存API Key
                saveApiKey(provider, apiKey);
                
                // 显示保存成功提示
                showSaveSuccessMessage();
                
                // 跳转到聊天页面
                setTimeout(() => {
                    window.location.href = 'chat.html';
                }, 1000);
            }
        });
    }
}

// 在页面加载时初始化API Key处理
document.addEventListener('DOMContentLoaded', function() {
    // 检查当前页面
    const isModelPage = window.location.pathname.includes('models.html');
    const isChatPage = window.location.pathname.includes('chat.html');
    
    if (isModelPage) {
        initModelPageApiKeyHandling();
    } else if (isChatPage) {
        initChatPageApiKeyHandling();
    }
});