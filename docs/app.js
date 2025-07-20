class MagnetCraftDownloader {
    constructor() {
        this.owner = 'InbarShirizly';
        this.repo = 'electron-example';
        this.latestRelease = null;
        this.userPlatform = this.detectPlatform();
        
        this.init();
    }

    async init() {
        await this.fetchLatestRelease();
        this.highlightUserPlatform();
        this.setupEventListeners();
    }

    detectPlatform() {
        const userAgent = navigator.userAgent.toLowerCase();
        
        if (userAgent.includes('win')) return 'windows';
        if (userAgent.includes('mac')) return 'mac';
        if (userAgent.includes('linux')) return 'linux';
        
        return 'unknown';
    }

    async fetchLatestRelease() {
        try {
            const response = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/releases/latest`);
            
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            
            this.latestRelease = await response.json();
            this.updateDownloadButtons();
        } catch (error) {
            console.error('Failed to fetch latest release:', error);
            this.showError('Unable to fetch latest release. Please visit our GitHub page.');
        }
    }

    highlightUserPlatform() {
        if (this.userPlatform === 'unknown') return;
        
        const platformCard = document.getElementById(`${this.userPlatform}-card`);
        if (platformCard) {
            platformCard.classList.add('detected');
        }
    }

    updateDownloadButtons() {
        if (!this.latestRelease) return;

        const assets = this.latestRelease.assets;
        const releaseTag = this.latestRelease.tag_name;
        
        // Update version info in buttons
        document.querySelectorAll('.btn-primary').forEach(btn => {
            const currentText = btn.textContent.trim();
            if (!currentText.includes('v')) {
                const iconSpan = btn.querySelector('.btn-icon');
                const icon = iconSpan ? iconSpan.outerHTML : '↓';
                btn.innerHTML = `${icon} ${currentText} ${releaseTag}`;
            }
        });
    }

    findAssetByPattern(assets, patterns) {
        for (const pattern of patterns) {
            const asset = assets.find(asset => 
                asset.name.toLowerCase().includes(pattern.toLowerCase())
            );
            if (asset) return asset;
        }
        return null;
    }

    getDownloadUrl(platform, format) {
        if (!this.latestRelease) {
            return `https://github.com/${this.owner}/${this.repo}/releases`;
        }

        const assets = this.latestRelease.assets;
        let asset = null;

        switch (platform) {
            case 'windows':
                if (format === 'exe') {
                    asset = this.findAssetByPattern(assets, ['.exe', 'win', 'windows']);
                } else if (format === 'portable') {
                    asset = this.findAssetByPattern(assets, ['portable.exe', 'win-portable']);
                }
                break;
                
            case 'mac':
                if (format === 'dmg') {
                    asset = this.findAssetByPattern(assets, ['.dmg', 'mac', 'macos']);
                } else if (format === 'zip') {
                    asset = this.findAssetByPattern(assets, ['mac.zip', 'macos.zip', 'darwin']);
                }
                break;
                
            case 'linux':
                if (format === 'deb') {
                    asset = this.findAssetByPattern(assets, ['.deb', 'linux']);
                } else if (format === 'AppImage') {
                    asset = this.findAssetByPattern(assets, ['.AppImage', 'appimage']);
                }
                break;
        }

        return asset ? asset.browser_download_url : `https://github.com/${this.owner}/${this.repo}/releases`;
    }

    async downloadLatest(platform, format) {
        const button = event.target.closest('button') || event.target.closest('a');
        
        if (button) {
            button.classList.add('loading');
        }

        try {
            const downloadUrl = this.getDownloadUrl(platform, format);
            
            // Track download event (optional)
            this.trackDownload(platform, format);
            
            // Start download
            window.open(downloadUrl, '_blank');
            
        } catch (error) {
            console.error('Download failed:', error);
            this.showError('Download failed. Please try again or visit our releases page.');
        } finally {
            if (button) {
                setTimeout(() => {
                    button.classList.remove('loading');
                }, 1000);
            }
        }
    }

    trackDownload(platform, format) {
        // Optional: Send analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'download', {
                'platform': platform,
                'format': format,
                'version': this.latestRelease?.tag_name || 'unknown'
            });
        }
        
        console.log(`Download started: ${platform} ${format}`);
    }

    showError(message) {
        // Create a simple error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #d73a49;
            color: white;
            padding: 1rem;
            border-radius: 6px;
            z-index: 1000;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        `;
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    setupEventListeners() {
        // Handle clicks on download links that don't have onclick
        document.addEventListener('click', (e) => {
            const link = e.target.closest('.download-link');
            if (link && link.getAttribute('onclick')) {
                e.preventDefault();
                eval(link.getAttribute('onclick'));
            }
        });
    }
}

// Global function for onclick handlers
function downloadLatest(platform, format) {
    if (window.magnetCraftDownloader) {
        window.magnetCraftDownloader.downloadLatest(platform, format);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.magnetCraftDownloader = new MagnetCraftDownloader();
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add platform-specific styling based on user agent
    const platform = navigator.userAgent.toLowerCase();
    if (platform.includes('win')) {
        document.body.classList.add('platform-windows');
    } else if (platform.includes('mac')) {
        document.body.classList.add('platform-mac');
    } else if (platform.includes('linux')) {
        document.body.classList.add('platform-linux');
    }
}); 