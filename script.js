function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

if (window.Typed) {
  try {
    new Typed("#element", {
      strings: ["Java", "MySQL", "JavaScript", "Spring-Boot", "React"],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      showCursor: false,
    });
  } catch (e) {}
}

const progressBars = document.querySelectorAll(".progress");
if (progressBars.length === 0) {
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const bars = document.querySelectorAll(".progress");
  if (bars.length > 0 && "IntersectionObserver" in window) {
    const progressObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          const bar = entry.target;
          if (entry.isIntersecting) {
            const p = bar.getAttribute("data-progress") || "60";
            bar.style.width = p + "%";
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.35 }
    );

    bars.forEach((b) => {
      b.style.width = "0%";
      progressObserver.observe(b);
    });
  } else if (bars.length > 0) {
    bars.forEach((b) => {
      const p = b.getAttribute("data-progress") || "60";
      b.style.width = p + "%";
    });
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const nameEl = document.getElementById("name");
      const emailEl = document.getElementById("email");
      const subjectEl = document.getElementById("subject");
      const messageEl = document.getElementById("message");

      const name = nameEl ? nameEl.value.trim() : "";
      const email = emailEl ? emailEl.value.trim() : "";
      const subject = subjectEl ? subjectEl.value.trim() : "";
      const message = messageEl ? messageEl.value.trim() : "";

      if (name === "" || email === "" || subject === "" || message === "") {
        alert("Please fill in all fields.");
        return;
      }

      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      alert("Message sent successfully!");
      this.reset();
    });
  }

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    const saved = localStorage.getItem("site-theme");
    if (saved === "light") {
      document.body.classList.add("light-theme");
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      const isLight = document.body.classList.contains("light-theme");
      localStorage.setItem("site-theme", isLight ? "light" : "dark");
    });
  }
});
