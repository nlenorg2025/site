/**
 * custom select dropdown with CSS + JS
 * ibaslogic
 * https://codepen.io/ibaslogic/pen/NPKdday
 * 
 */

/** Custom Dropdown Structure
<div class="custom-select">
  <button
    id="dropdown-button"
    class="select-button"
    role="combobox"
    aria-label="select button"
    aria-haspopup="listbox"
    aria-expanded="false"
    aria-controls="select-dropdown"
  >
    <span class="selected-value">Open this select menu</span>
    <span class="arrow"></span>
  </button>
  <ul
    class="select-dropdown hidden"
    role="listbox"
    id="select-dropdown"
    aria-labelledby="dropdown-button"
  >
    <li role="option"><i class="bx bxl-github"></i> GitHub</li>
    <li role="option"><i class="bx bxl-instagram"></i> Instagram</li>
    <li role="option"><i class="bx bxl-facebook-circle"></i> Facebook</li>
    <li role="option"><i class="bx bxl-linkedin-square"></i> LinkedIn</li>
    <li role="option"><i class="bx bxl-twitter"></i> Twitter</li>
    <li role="option"><i class="bx bxl-reddit"></i> Reddit</li>
    <!-- Clear option to reset selection -->
    <li role="option" data-value="clear">
      <span>Clear selection</span>
    </li>
  </ul>
</div>
<link  href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet"
/>
*/

/** Custom Dropdown Styling
.custom-select {
  margin-top: 3rem;
  position: relative;
  display: inline-block;
  width: 300px;
  max-width: 100%;
}

.select-button {
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.675em 1em;
  border: 1px solid #caced1;
  border-radius: 0.25rem;
  background-color: white;
  cursor: pointer;
}

.arrow {
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid #000;
  transition: transform ease-in-out 0.3s;
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #caced1;
  border-radius: 0.25rem;
  background-color: white;
  list-style: none;
  padding: 10px;
  margin: 10px 0 0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-height: 200px;
  overflow-y: auto;
}

.select-dropdown::-webkit-scrollbar {
  width: 7px;
}
.select-dropdown::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 25px;
}

.select-dropdown::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 25px;
}

.select-dropdown li {
  padding: 10px;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

// Highlight the selected option 
.select-dropdown li.selected {
    background-color: #f2f2f2;
    border-radius: 4px;
    font-weight: bold;
  }
  
  .select-dropdown li:hover,
  .select-dropdown li:focus {
    background-color: #f2f2f2;
    border-radius: 4px;
  }
  
  .select-dropdown.hidden {
    display: none;
  }
  
  .select-button[aria-expanded="true"] .arrow {
    transform: rotate(180deg);
  }

 */


document.addEventListener("DOMContentLoaded", () => {
    const customSelects = document.querySelectorAll(".custom-select");

    customSelects.forEach((customSelect) => {
        const selectButton = customSelect.querySelector(".select-button");
        const dropdown = customSelect.querySelector(".select-dropdown");
        const options = dropdown.querySelectorAll("li");
        const selectedValue = selectButton.querySelector(".selected-value");

        let focusedIndex = -1;

        const toggleDropdown = (expand = null) => {
            const isOpen =
                expand !== null ? expand : dropdown.classList.contains("hidden");
            dropdown.classList.toggle("hidden", !isOpen);
            selectButton.setAttribute("aria-expanded", isOpen);

            if (isOpen) {
                focusedIndex = [...options].findIndex((option) =>
                    option.classList.contains("selected")
                );
                focusedIndex = focusedIndex === -1 ? 0 : focusedIndex;
                updateFocus();
            } else {
                focusedIndex = -1;
                selectButton.focus();
            }
        };

        const updateFocus = () => {
            options.forEach((option, index) => {
                if (option) {
                    option.setAttribute("tabindex", index === focusedIndex ? "0" : "-1");
                    if (index === focusedIndex) option.focus();
                }
            });
        };

        const handleOptionSelect = (option) => {
            options.forEach((opt) => opt.classList.remove("selected"));
            option.classList.add("selected");
            selectedValue.textContent = option.textContent.trim(); // Update selected value

            if (option.dataset.value === "clear") {
                // Reset to the default value
                selectedValue.textContent = "Open this select menu";
                options.forEach((opt) => opt.classList.remove("selected"));
                return;
            }
        };

        options.forEach((option) => {
            option.addEventListener("click", () => {
                handleOptionSelect(option);
                toggleDropdown(false);
            });
        });

        selectButton.addEventListener("click", () => {
            toggleDropdown();
        });

        selectButton.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
                event.preventDefault();
                toggleDropdown(true);
            } else if (event.key === "Escape") {
                toggleDropdown(false);
            }
        });

        dropdown.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
                event.preventDefault();
                focusedIndex = (focusedIndex + 1) % options.length;
                updateFocus();
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                focusedIndex = (focusedIndex - 1 + options.length) % options.length;
                updateFocus();
            } else if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleOptionSelect(options[focusedIndex]);
                toggleDropdown(false);
            } else if (event.key === "Escape") {
                toggleDropdown(false);
            }
        });

        document.addEventListener("click", (event) => {
            const isOutsideClick = !customSelect.contains(event.target);

            if (isOutsideClick) {
                toggleDropdown(false);
            }
        });
    });
});
