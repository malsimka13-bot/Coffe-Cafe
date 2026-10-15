/* ==========================================================
   Aroma Craft — скрипты (чистый JavaScript, без библиотек)
   ========================================================== */
"use strict";

/* ---------- 1. Бургер-меню ---------- */
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
if (burger && nav) {
  burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav--open"); // добавить/убрать класс
    burger.setAttribute("aria-expanded", String(isOpen));
  });
}

/* ---------- 2. Фильтр меню (menu.html) ---------- */
const chips = document.querySelectorAll(".chip");
const dishes = document.querySelectorAll(".card[data-category]");
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const filter = chip.dataset.filter; // значение из data-filter
    chips.forEach((c) => c.classList.toggle("chip--active", c === chip));
    // hidden скрывает карточки, которые не подходят
    dishes.forEach((d) => {
      d.hidden = filter !== "all" && d.dataset.category !== filter;
    });
  });
});

/* ---------- 3. Калькулятор КБЖУ (nutrition.html) ---------- */
const checks = document.querySelectorAll(".calc-check");
if (checks.length) {
  const out = {
    kcal: document.querySelector("#sum-kcal"),
    p: document.querySelector("#sum-p"),
    f: document.querySelector("#sum-f"),
    c: document.querySelector("#sum-c"),
  };
  const recalc = () => {
    const sum = { kcal: 0, p: 0, f: 0, c: 0 };
    checks.forEach((box) => {
      if (box.checked) {
        // Number() превращает строку из data-атрибута в число
        for (const key in sum) sum[key] += Number(box.dataset[key]);
      }
    });
    out.kcal.textContent = Math.round(sum.kcal);
    out.p.textContent = sum.p.toFixed(1);
    out.f.textContent = sum.f.toFixed(1);
    out.c.textContent = sum.c.toFixed(1);
  };
  checks.forEach((box) => box.addEventListener("change", recalc));
}

/* ---------- 4. Бронирование (booking.html) ---------- */
const form = document.querySelector("#booking-form");
if (form) {
  const dateInput = form.querySelector("#visit-date");
  // Нельзя выбрать прошедшую дату: min = сегодня (по местному времени)
  const now = new Date();
  const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  dateInput.min = today;

  const msg = form.querySelector("#form-msg");
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // сервера нет, поэтому не перезагружаем страницу
    const name = form.querySelector("#user-name").value.trim();
    msg.classList.remove("form-msg--error");
    msg.textContent = "Спасибо, " + name + "! Мы свяжемся с вами для подтверждения брони.";
    form.reset();
    dateInput.min = today;
  });
}
