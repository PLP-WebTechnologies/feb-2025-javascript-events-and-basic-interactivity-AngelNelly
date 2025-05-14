document.addEventListener("DOMContentLoaded", () => {
  // Progress bars click, hover, and mouseout event listeners
  const allProgressBars = document.querySelectorAll(".progress-bar");
  allProgressBars.forEach((bar) => {
    bar.addEventListener("click", (event) => {
      const skillName = event.target
        .closest(".skill-item")
        .querySelector("label").textContent;
      const skillValue = event.target
        .closest(".skill-item")
        .querySelector(".progress").dataset.value;
      alert(`You clicked on ${skillName} which is at ${skillValue}%`); // Button click
    });

    bar.addEventListener("mouseover", (event) => {
      const progressElement = event.currentTarget.querySelector(".progress");
      progressElement.style.backgroundColor = "#333333"; // Hover effect
    });

    bar.addEventListener("mouseout", (event) => {
      const progressElement = event.currentTarget.querySelector(".progress");
      progressElement.style.backgroundColor = "#3159bc"; // Revert hover effect
    });
  });

  // Keypress event listener
  document.addEventListener("keypress", (event) => {
    console.log(`You pressed the key: ${event.key}`); // Keypress detection
  });

  // Secret area for long press and double click detection
  const secretArea = document.getElementById("secretArea");
  let longPressTimer;
  let isLongPress = false;

  secretArea.addEventListener("mousedown", () => {
    longPressTimer = setTimeout(() => {
      isLongPress = true;
      secretAction("longPress");
    }, 1000); // 1 second for long press
  });

  secretArea.addEventListener("mouseup", () => {
    clearTimeout(longPressTimer);
    if (!isLongPress) {
      // No action on single click to avoid confusion with double-click
    }
    isLongPress = false;
  });

  secretArea.addEventListener("dblclick", () => {
    secretAction("You clicked me twice!");
  });

  function secretAction(type) {
    alert(`Secret action triggered: ${type}!`);
    secretArea.textContent =
      type === "doubleClick"
        ? "Double-click detected!"
        : "Long press detected!";
    setTimeout(() => {
      secretArea.textContent = "Double-click or long press me for a surprise!";
    }, 2000);
  }

  // --- Interactive Elements ---

  // Change text button functionality
  const changeTextButton = document.getElementById("changeTextButton");
  const originalButtonText = changeTextButton.textContent;
  let isOriginalText = true;

  changeTextButton.addEventListener("click", () => {
    changeTextButton.textContent = isOriginalText
      ? "Text Changed!"
      : originalButtonText;
    changeTextButton.style.backgroundColor = isOriginalText
      ? "#007bff"
      : "#5cb85c";
    isOriginalText = !isOriginalText;
  });

  // Image gallery functionality
  const imageGallery = document.getElementById("imageGallery");
  const images = imageGallery.querySelectorAll("img");
  const prevButton = document.getElementById("prevImage");
  const nextButton = document.getElementById("nextImage");
  let currentIndex = 0;

  // Function to show the current image
  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle("active", i === index);
    });
  }

  // Check if images are loaded
  images.forEach((img, index) => {
    img.addEventListener("error", () => {
      console.error(`Failed to load image at index ${index}: ${img.src}`);
      img.alt = `Image ${index + 1} (Failed to load)`;
    });
  });

  // Show the first image initially
  showImage(currentIndex);

  // Button click events for previous and next image
  prevButton.addEventListener("click", () => {
    currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    showImage(currentIndex);
  });

  nextButton.addEventListener("click", () => {
    currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    showImage(currentIndex);
  });

  // Accordion functionality
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const isActive = content.classList.contains("active");
      // Close all other accordion items
      document.querySelectorAll(".accordion-content").forEach((c) => {
        c.classList.remove("active");
      });
      // Toggle the clicked item
      if (!isActive) {
        content.classList.add("active");
      }
    });
  });

  // Form validation functionality
  const form = document.getElementById("myForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const formMessage = document.getElementById("formMessage");

  // Real-time validation
  nameInput.addEventListener("input", () => {
    nameError.textContent = nameInput.value.trim() ? "" : "Name is required";
  });

  emailInput.addEventListener("input", () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailError.textContent = emailPattern.test(emailInput.value)
      ? ""
      : "Enter a valid email";
  });

  passwordInput.addEventListener("input", () => {
    passwordError.textContent =
      passwordInput.value.length >= 8
        ? ""
        : "Password must be at least 8 characters";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate name
    if (!nameInput.value.trim()) {
      nameError.textContent = "Name is required";
      isValid = false;
    } else {
      nameError.textContent = "";
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
      emailError.textContent = "Enter a valid email";
      isValid = false;
    } else {
      emailError.textContent = "";
    }

    // Validate password
    if (passwordInput.value.length < 8) {
      passwordError.textContent = "Password must be at least 8 characters";
      isValid = false;
    } else {
      passwordError.textContent = "";
    }

    // Show form message
    formMessage.textContent = isValid
      ? "Form submitted successfully!"
      : "Please fix the errors above.";
    formMessage.className = `form-message ${isValid ? "success" : "error"}`;
    if (isValid) {
      form.reset();
      setTimeout(() => {
        formMessage.textContent = "";
        formMessage.className = "form-message";
      }, 3000);
    }
  });
});
