        /* ── Animated background canvas ── */
        const canvas = document.getElementById('bg-canvas');
        const ctx = canvas.getContext('2d');
        let W, H, blobs;

        const colors = ['#2ec46d', '#3ab8ff', '#ffd93d', '#ff7b2e', '#a06cff', '#ff6ba8'];

        function initCanvas() {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
            blobs = Array.from({ length: 6 }, (_, i) => ({
                x: Math.random() * W,
                y: Math.random() * H,
                r: 180 + Math.random() * 140,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                color: colors[i],
            }));
        }

        function drawCanvas() {
            ctx.clearRect(0, 0, W, H);
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            ctx.fillStyle = isDark ? '#0f1420' : '#f0faf4';
            ctx.fillRect(0, 0, W, H);
            blobs.forEach(b => {
                const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
                g.addColorStop(0, b.color + (isDark ? '20' : '28'));
                g.addColorStop(1, b.color + '00');
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fillStyle = g;
                ctx.fill();
                b.x += b.vx; b.y += b.vy;
                if (b.x < -b.r) b.x = W + b.r;
                if (b.x > W + b.r) b.x = -b.r;
                if (b.y < -b.r) b.y = H + b.r;
                if (b.y > H + b.r) b.y = -b.r;
            });
            requestAnimationFrame(drawCanvas);
        }

        initCanvas();
        drawCanvas();
        window.addEventListener('resize', initCanvas);

        /* ── Burger menu ── */
        function toggleMenu() {
            document.getElementById('navLinks').classList.toggle('open');
        }

        /* ── Theme Toggle ── */
        const themeBtn = document.getElementById('theme-toggle');
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            document.body.setAttribute('data-theme', currentTheme);
        }
        
        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                let theme = document.body.getAttribute('data-theme');
                if (theme === 'dark') {
                    document.body.setAttribute('data-theme', 'light');
                    localStorage.setItem('theme', 'light');
                } else {
                    document.body.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                }
            });
        }

        /* ── Scroll reveal ── */
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((e, i) => {
                if (e.isIntersecting) {
                    setTimeout(() => e.target.classList.add('visible'), i * 80);
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.12 });
        reveals.forEach(el => observer.observe(el));
