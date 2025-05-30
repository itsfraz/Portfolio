document.addEventListener('DOMContentLoaded', () => {
    // Helper function to query elements
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    // 1. Form Validation & Submission Handling with Local Storage
    const contactForm = $('#contact form'); // Target form within #contact section
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = $('#name');
            const emailInput = $('#email');
            const messageInput = $('#message');

            // Basic validation
            let isValid = true;
            [nameInput, emailInput, messageInput].forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('is-invalid'); // Optional: Add Bootstrap invalid style
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            if (!isValid) {
                showToast('Please fill all fields!', 'error');
                return;
            }

            // Simple email format check (basic)
            if (!/^\S+@\S+\.\S+$/.test(emailInput.value.trim())) {
                emailInput.classList.add('is-invalid');
                showToast('Please enter a valid email address!', 'error');
                return;
            } else {
                 emailInput.classList.remove('is-invalid');
            }


            // Save to local storage
            const submission = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim(),
                timestamp: new Date().toISOString()
            };
            const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
            submissions.push(submission);
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

            showToast('Message sent successfully! Saved locally.', 'success');
            contactForm.reset();
            [nameInput, emailInput, messageInput].forEach(input => input.classList.remove('is-invalid'));
        });
    }

    // Toast Notification Function
    function showToast(message, type = 'info') { // Default type
        const existingToast = $('.toast');
        if (existingToast) existingToast.remove(); // Remove existing toast first

        const toast = document.createElement('div');
        toast.className = `toast ${type}`; // Types: success, error, info (default)
        toast.textContent = message;
        document.body.appendChild(toast);

        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'toastFadeOut 0.5s ease forwards'; // Add fade-out animation
            toast.addEventListener('animationend', () => toast.remove());
        }, 3000);
    }
    // Add CSS for fade-out animation if not already present
    const styleSheet = document.styleSheets[0];
     try { // Use try-catch in case stylesheet access fails
        styleSheet.insertRule(`
            @keyframes toastFadeOut {
                to {
                    opacity: 0;
                    transform: translateY(20px);
                }
            }
        `, styleSheet.cssRules.length);
        styleSheet.insertRule(`
            .form-control.is-invalid { border-color: #dc3545; }
        `, styleSheet.cssRules.length);
    } catch (e) {
        console.warn("Could not insert CSS rules for toast fade-out or invalid input.");
    }


    // 2. Smooth Scroll Behavior
    $$('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = $(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });

                // Optional: Close mobile menu after clicking a link
                const navbarCollapse = $('.navbar-collapse.show');
                if (navbarCollapse) {
                    // Use Bootstrap's JS to toggle if available, otherwise direct class manipulation
                     if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                         const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                         if (bsCollapse) bsCollapse.hide();
                     } else {
                         navbarCollapse.classList.remove('show');
                     }
                }
            }
        });
    });

    // 3. Sticky Navigation with Active State Highlighting
    const navLinks = $$('.navbar-nav .nav-link'); // More specific selector
    const sections = $$('main section[id]'); // Target sections in main with an ID

    function updateActiveNav() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
             // Consider a section active if it's within the viewport or slightly above
             // Adjust offset (e.g., 150px) based on sticky header height + buffer
            if (scrollPosition >= sectionTop - 150 && scrollPosition < sectionTop + sectionHeight - 150) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
             // Match href like "#skills-section" or "resume.html#experience"
            const linkHref = link.getAttribute('href');
            if (linkHref.includes(`#${currentSectionId}`) && currentSectionId) {
                link.classList.add('active');
            }
        });

        // Handle cases where no specific section is active (e.g., top of page)
        if (!currentSectionId) {
             // Maybe activate 'Home' link or clear all? Depends on design.
             // Example: Activate 'Home' if at the very top
            //  if (scrollPosition < 100) {
            //      const homeLink = $('.navbar-nav .nav-link[href*="index.html"]');
            //      if (homeLink) homeLink.classList.add('active');
            //  }
        }
    }
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial check on load


    // 4. Scroll Progress Bar
    const progressBar = $('.scroll-progress'); // Assume it exists in HTML or create dynamically
    if (!progressBar) {
        const progressBarEl = document.createElement('div');
        progressBarEl.className = 'scroll-progress';
        document.body.prepend(progressBarEl); // Add to the top of body
    }
    const progressBarElement = $('.scroll-progress'); // Get reference again
    if (progressBarElement) {
        window.addEventListener('scroll', () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
            progressBarElement.style.width = `${progress}%`;
        });
    }


    // 5. Project Filtering (Assuming 'projects.html' context)
    const filterButtonsContainer = $('.filter-buttons');
    const projectCards = $$('.project-card');

    if (filterButtonsContainer && projectCards.length > 0) {
        // Add filter buttons dynamically if they don't exist
        if (!filterButtonsContainer.innerHTML.trim()) {
             const techs = new Set();
             projectCards.forEach(card => {
                card.querySelectorAll('.tech-stack .badge').forEach(badge => techs.add(badge.textContent.trim()));
             });

             filterButtonsContainer.innerHTML = `
                <button class="btn btn-outline-primary m-1 active" data-filter="all">All</button>
                ${[...techs].sort().map(tech =>
                    `<button class="btn btn-outline-primary m-1" data-filter="${tech}">${tech}</button>`
                ).join('')}
             `;
        }

        const filterButtons = $$('.filter-buttons .btn');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.dataset.filter;

                // Update active button state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter cards
                projectCards.forEach(cardContainer => {
                    // Assuming card is direct child or nested within a column
                    const card = cardContainer.querySelector('.card') || cardContainer;
                    const badges = card.querySelectorAll('.tech-stack .badge');
                    const cardTechs = Array.from(badges).map(badge => badge.textContent.trim());

                    const shouldShow = filterValue === 'all' || cardTechs.includes(filterValue);

                    // Target the container (e.g., the column div) for display none/block
                    const parentColumn = card.closest('.col-md-6, .col-lg-4'); // Adjust selectors as needed
                    if (parentColumn) {
                       parentColumn.style.display = shouldShow ? '' : 'none';
                    } else {
                        card.style.display = shouldShow ? 'block' : 'none'; // Fallback
                    }

                });
            });
        });
    }

    // 6. Project Card Modal Popup (Refined)
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay'; // Add class for CSS styling
    document.body.appendChild(modalOverlay); // Append once

    function showModal(title, desc, tech, codeLink, demoLink) {
        modalOverlay.innerHTML = `
            <div class="modal-content animate__animated animate__fadeInUp animate__faster">
                 <button class="close-modal" aria-label="Close modal">×</button>
                <h3>${title}</h3>
                <p>${desc}</p>
                <p><strong>Technologies:</strong> ${tech}</p>
                <div class="modal-actions">
                    ${codeLink ? `<a href="${codeLink}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary"><i class="fab fa-github"></i> Code</a>` : ''}
                    ${demoLink ? `<a href="${demoLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                </div>
            </div>
        `;
        modalOverlay.classList.add('active'); // Show modal
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Close modal functionality
        modalOverlay.querySelector('.close-modal').addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            // Close if clicked outside the modal-content
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    function closeModal() {
        const modalContent = modalOverlay.querySelector('.modal-content');
        if (modalContent) {
            // Optional: Add fade-out animation
             modalContent.classList.remove('animate__fadeInUp');
             modalContent.classList.add('animate__fadeOutDown');
             modalContent.addEventListener('animationend', () => {
                 modalOverlay.classList.remove('active');
                 modalOverlay.innerHTML = ''; // Clear content after animation
                 document.body.style.overflow = ''; // Restore scrolling
             }, { once: true });
        } else {
             modalOverlay.classList.remove('active');
             modalOverlay.innerHTML = '';
             document.body.style.overflow = '';
        }

    }

    // Add click listeners to project cards
    $$('.project-card').forEach(cardContainer => {
         // Make the whole card clickable, or just a specific button/link
         cardContainer.addEventListener('click', (e) => {
             // Prevent modal trigger if clicking on direct links inside the card
             if (e.target.closest('a')) {
                 return;
             }

             const card = cardContainer.querySelector('.card') || cardContainer;
             const title = card.querySelector('.card-title')?.textContent || 'Project Details';
             const desc = card.querySelector('.card-text')?.textContent || 'No description available.';
             const tech = Array.from(card.querySelectorAll('.tech-stack .badge')).map(b => b.textContent.trim()).join(', ') || 'N/A';
             const codeLink = card.querySelector('a[href*="github.com"]')?.href; // Find GitHub link
             const demoLink = card.querySelector('a:not([href*="github.com"]).btn-primary')?.href; // Find primary button link (likely demo)


            showModal(title, desc, tech, codeLink, demoLink);
         });
         cardContainer.style.cursor = 'pointer'; // Indicate clickable
    });


    // 7. Dynamic Typing Effect (Hero Section)
    const typedElement = $('.typed-text');
    if (typedElement) {
        const roles = ['Full Stack Developer', 'Problem Solver', 'Tech Enthusiast', 'Lifelong Learner'];
        let roleIndex = 0;
        let charIndex = 0;
        let currentRole = '';
        let isDeleting = false;

        function type() {
            currentRole = roles[roleIndex];
            const typeSpeed = isDeleting ? 50 : 120; // Faster deleting

            // Type or delete characters
            typedElement.textContent = isDeleting
                ? currentRole.substring(0, charIndex--)
                : currentRole.substring(0, charIndex++);

            // Check state
            if (!isDeleting && charIndex === currentRole.length) {
                // Pause at end of word
                setTimeout(() => { isDeleting = true; }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                 setTimeout(type, 500); // Pause before typing next word
                 return; // Exit to avoid immediate next char typing
            }

            setTimeout(type, typeSpeed);
        }
        setTimeout(type, 500); // Initial delay
    }

    // 8. Dark Mode Toggle
    const darkModeToggle = $('.dark-mode-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function applyDarkMode(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
            if(darkModeToggle) darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for dark mode
        } else {
            document.body.classList.remove('dark-mode');
            if(darkModeToggle) darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for light mode
        }
    }

    // Check local storage first
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        applyDarkMode(storedTheme === 'dark');
    } else {
        // Apply based on system preference
        applyDarkMode(prefersDark.matches);
    }

    // Add toggle button listener
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            applyDarkMode(isDark); // Update icon
            localStorage.setItem('theme', isDark ? 'dark' : 'light'); // Store preference
        });
    }

     // Listen for system preference changes
     prefersDark.addEventListener('change', (e) => {
         // Only apply if no theme is stored in local storage
         if (!localStorage.getItem('theme')) {
             applyDarkMode(e.matches);
         }
     });


    // 9. Skill Progress Animation on Scroll
    const skillProgressBars = $$('.skill-progress');
    if (skillProgressBars.length > 0) {
        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.dataset.width || '0%'; // Get target width from data attribute
                    progressBar.style.width = targetWidth; // Animate width

                    // Add percentage label (only if not already added)
                    const skillItem = progressBar.closest('.skill-item');
                    const skillName = skillItem?.querySelector('.skill-name');
                    if (skillName && !skillName.textContent.includes('%')) { // Check if label exists
                         // Create a span for the percentage to style it separately if needed
                        const percentageSpan = document.createElement('span');
                        percentageSpan.className = 'skill-percentage';
                        percentageSpan.textContent = ` (${targetWidth})`;
                        percentageSpan.style.marginLeft = 'auto'; // Push to the right
                        percentageSpan.style.fontSize = '0.8em';
                        percentageSpan.style.color = 'var(--text-light)';
                        // skillName.appendChild(percentageSpan); // Append to name
                        skillName.parentNode.insertBefore(percentageSpan, skillName.nextSibling); // Insert after name
                    }

                    observer.unobserve(progressBar); // Stop observing once animated
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% visible

        skillProgressBars.forEach(progress => {
            // Store the target width in a data attribute and reset initial width
            progress.dataset.width = progress.style.width || '0%';
            progress.style.width = '0%';
            skillObserver.observe(progress);
        });
    }

    // 10. Back-to-Top Button Visibility
    const backToTopButton = $('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'block';
                 // Optional: Add fade-in animation
                 backToTopButton.style.opacity = '1';
                 backToTopButton.style.transform = 'translateY(0)';

            } else {
                 // Optional: Add fade-out animation
                 backToTopButton.style.opacity = '0';
                 backToTopButton.style.transform = 'translateY(10px)';
                 // Hide after animation finishes
                 setTimeout(() => {
                     if(window.scrollY <= 300) backToTopButton.style.display = 'none';
                 }, 300); // Match transition duration
            }
        });
        // Add smooth scroll to top action
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
         // Add CSS for the transition if not already present
        backToTopButton.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        backToTopButton.style.opacity = '0'; // Start hidden
        backToTopButton.style.transform = 'translateY(10px)';
    }

    // 11. Hero Section Parallax Effect (Mouse Move) - Optional, can be demanding
    const heroSection = $('.hero-section');
    const profileImgContainer = $('.profile-img-container');
    if (heroSection && profileImgContainer && window.innerWidth > 992) { // Only apply on larger screens
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            // Calculate mouse position relative to the center of the hero section
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Apply subtle transform based on mouse position
            // Adjust divisor (e.g., 50) for sensitivity
            const moveX = -x / 50;
            const moveY = -y / 50;

            // Apply to the image container for a subtle effect
             profileImgContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;
            // Optional: Apply to text elements as well with different sensitivity
            // $('.hero-section h1').style.transform = `translate(${-x / 70}px, ${-y / 70}px)`;
            // $('.typed-container').style.transform = `translate(${-x / 60}px, ${-y / 60}px)`;
        });

         heroSection.addEventListener('mouseleave', () => {
             // Reset transform on mouse leave
             profileImgContainer.style.transform = 'translate(0, 0)';
            //  $('.hero-section h1').style.transform = 'translate(0, 0)';
            //  $('.typed-container').style.transform = 'translate(0, 0)';
         });
    }

    // 12. Ensure mobile menu closes on link click (already handled in smooth scroll part)

   
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
});