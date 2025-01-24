document.addEventListener('DOMContentLoaded', () => {
    // 1. Form Validation & Submission Handling
    const form = document.querySelector('form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if(!name || !email || !message) {
                showToast('Please fill all fields!', 'error');
                return;
            }

            // Simulate form submission
            showToast('Message sent successfully!', 'success');
            form.reset();
        });
    }

    // Toast notification function
    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.remove(), 3000);
    }

    // 2. Smooth Scroll Behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 3. Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('animate__fadeInUp');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // 4. Projects Filtering (For projects.html)
    if(document.querySelector('.projects-section')) {
        window.filterProjects = (tech) => {
            const cards = document.querySelectorAll('.project-card');
            cards.forEach(card => {
                const badges = card.querySelectorAll('.badge');
                const hasTech = tech === 'all' ? true : 
                    Array.from(badges).some(badge => 
                        badge.textContent.toLowerCase().includes(tech.toLowerCase())
                    );
                card.style.display = hasTech ? 'block' : 'none';
            });
        }
    }

    // 5. Dynamic Typing Effect (For index.html)
    if(document.querySelector('.typed-text')) {
        const roles = ['Full Stack Developer', 'Problem Solver', 'Tech Enthusiast'];
        let roleIndex = 0;
        const typedElement = document.querySelector('.typed-text');

        function typeRole() {
            typedElement.textContent = '';
            const currentRole = roles[roleIndex];
            let charIndex = 0;
            
            const typingInterval = setInterval(() => {
                typedElement.textContent += currentRole[charIndex];
                charIndex++;
                if(charIndex === currentRole.length) {
                    clearInterval(typingInterval);
                    setTimeout(eraseRole, 2000);
                }
            }, 100);
        }

        function eraseRole() {
            const currentText = typedElement.textContent;
            let charIndex = currentText.length - 1;
            
            const erasingInterval = setInterval(() => {
                typedElement.textContent = currentText.substring(0, charIndex);
                charIndex--;
                if(charIndex < 0) {
                    clearInterval(erasingInterval);
                    roleIndex = (roleIndex + 1) % roles.length;
                    typeRole();
                }
            }, 50);
        }

        typeRole();
    }

    // 6. Dark Mode Toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.className = 'btn btn-light ml-3';
    const navbar = document.querySelector('.navbar');
    if(navbar) {
        navbar.appendChild(darkModeToggle);
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    });

    // 7. Skill Progress Animation (For resume.html)
    if(document.querySelector('.skill-progress')) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.style.width = entry.target.dataset.width;
                }
            });
        });

        document.querySelectorAll('.skill-progress').forEach(progress => {
            progress.dataset.width = progress.style.width;
            progress.style.width = '0';
            skillObserver.observe(progress);
        });
    }

    // 8. Mobile Menu Close on Click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if(navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
});