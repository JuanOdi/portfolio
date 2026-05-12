/**
 * GSAP animations for the portfolio
 * - Hero intro timeline
 * - Scroll-triggered reveals for sections
 * - Career timeline alternating reveals
 */
(function () {
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  document.addEventListener('DOMContentLoaded', function () {

    /* -------------------------------
     Hero intro timeline (ScrollTrigger-gated)
    --------------------------------*/
    const heroSection = document.querySelector('.top-bnr');
    const heroIntro = document.querySelector('.top-bnr__intro');
    const codeWindow = document.querySelector('.top-bnr__card');

    if (heroSection && heroIntro && typeof ScrollTrigger !== 'undefined') {
      const heroTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: heroSection,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      heroTl
        .from('.top-bnr__hello', { y: 20, opacity: 0, duration: 0.6 })
        .from('.top-bnr__name', { y: 30, opacity: 0, duration: 0.8 }, '-=0.3')
        .from('.top-bnr__role', { y: 20, opacity: 0, duration: 0.6 }, '-=0.45')
        .from('.top-bnr__desc', { y: 20, opacity: 0, duration: 0.5 }, '-=0.35')
        .from('.top-bnr__meta .badge', { y: 14, opacity: 0, duration: 0.4, stagger: 0.1 }, '-=0.3')
        .from('.top-bnr__actions .btn', { y: 14, opacity: 0, duration: 0.4, stagger: 0.1 }, '-=0.3');

      if (codeWindow) {
        heroTl.from('.top-bnr__card', {
          y: 40,
          opacity: 0,
          rotateY: -12,
          duration: 0.9,
        }, '-=0.7');

        heroTl.from('.code-line', {
          x: -10,
          opacity: 0,
          duration: 0.35,
          stagger: 0.08,
        }, '-=0.4');
      }
    }

    /* -------------------------------
     Section labels + titles fade-up
    --------------------------------*/
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.utils.toArray('section').forEach(function (section) {
        const label = section.querySelector('.section-label');
        const title = section.querySelector('.ttl-01');
        if (!label && !title) return;

        const targets = [label, title].filter(Boolean);

        gsap.from(targets, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      });

      /* -------------------------------
       Featured Works stagger reveal
      --------------------------------*/
      const workItems = gsap.utils.toArray('.list-work__item');
      if (workItems.length) {
        gsap.from(workItems, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.list-work',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      /* -------------------------------
       About reveal
      --------------------------------*/
      const aboutAvatar = document.querySelector('.top-about__avatar');
      const aboutWrap = document.querySelector('.top-about__wrap');
      if (aboutAvatar) {
        gsap.from(aboutAvatar, {
          x: -40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.top-about',
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        });
      }
      if (aboutWrap) {
        gsap.from(aboutWrap.children, {
          y: 24,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.top-about',
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
        });
      }

      /* -------------------------------
       Career Timeline reveal
      --------------------------------*/
      const tlItems = gsap.utils.toArray('.js-timeline-item');
      tlItems.forEach(function (item, i) {
        const isEven = i % 2 === 1;
        const isMobile = window.matchMedia('(max-width: 720px)').matches;
        const fromX = isMobile ? -30 : (isEven ? 60 : -60);

        gsap.from(item, {
          x: fromX,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        const dot = item.querySelector('.timeline__dot');
        if (dot) {
          gsap.from(dot, {
            scale: 0,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
        }
      });

      /* -------------------------------
       Stat counters (count-up)
      --------------------------------*/
      gsap.utils.toArray('.js-counter').forEach(function (el) {
        const target = parseFloat(el.dataset.target) || 0;
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: function () {
            el.textContent = Math.round(obj.val);
          },
        });
      });

      const statItems = gsap.utils.toArray('.stats__item');
      if (statItems.length) {
        gsap.from(statItems, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.stats',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      /* -------------------------------
       Skill groups + bar fills
      --------------------------------*/
      const skillGroups = gsap.utils.toArray('.js-skill-group');
      skillGroups.forEach(function (group) {
        gsap.from(group, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        const fills = group.querySelectorAll('.js-skill-fill');
        fills.forEach(function (fill) {
          const level = parseFloat(fill.dataset.level) || 0;
          gsap.to(fill, {
            width: level + '%',
            duration: 1.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: fill,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          });
        });
      });

      /* -------------------------------
       Process steps stagger reveal
      --------------------------------*/
      const processSteps = gsap.utils.toArray('.js-process-step');
      if (processSteps.length) {
        gsap.from(processSteps, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.process',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      /* -------------------------------
       Services cards stagger reveal
      --------------------------------*/
      const svcItems = gsap.utils.toArray('.list-services__item');
      if (svcItems.length) {
        gsap.from(svcItems, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.list-services',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      /* -------------------------------
       Contact reveal
      --------------------------------*/
      const contactForm = document.querySelector('.top-contact__form');
      const contactWrap = document.querySelector('.top-contact__wrap');
      if (contactForm) {
        gsap.from(contactForm, {
          x: -40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.top-contact',
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        });
      }
      if (contactWrap) {
        gsap.from(contactWrap, {
          x: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.top-contact',
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        });
      }
    }
  });
})();
