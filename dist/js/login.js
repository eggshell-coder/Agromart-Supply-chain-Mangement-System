import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
import { initAgroScene } from "/js/login-scene.js";

const SUPABASE_URL = "https://qhkckodhjvnuoablpfwq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoa2Nrb2RoanZudW9hYmxwZndxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMjAwNzcsImV4cCI6MjA5MjU5NjA3N30.ifETbDHuaqlSUOl20SFLCAFzzuBbaqhc_bglCCa1LrU";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

const rememberedEmail = localStorage.getItem("agromart_remember_email") || "";
const savedToken = sessionStorage.getItem("agromart_token");
const savedUser = sessionStorage.getItem("agromart_user");

if (savedToken && savedUser) {
  window.location.replace("/dashboard");
}

const root = document.documentElement;
const leftText = document.getElementById("leftText");
const loginCard = document.getElementById("loginCard");
const sceneStage = document.getElementById("sceneStage");
const lightningFlash = document.getElementById("lightningFlash");
const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rememberMeInput = document.getElementById("rememberMe");
const togglePasswordBtn = document.getElementById("togglePassword");
const emailHint = document.getElementById("emailHint");
const passwordHint = document.getElementById("passwordHint");
const globalError = document.getElementById("globalError");
const loginBtn = document.getElementById("loginBtn");
const btnText = document.getElementById("btnText");
const btnSpinner = document.getElementById("btnSpinner");

let stormMode = false;
let lightningTimer = null;

function clearLightningTimer() {
  if (lightningTimer) {
    window.clearTimeout(lightningTimer);
    lightningTimer = null;
  }
}

function scheduleLightning() {
  clearLightningTimer();
  if (!stormMode || !lightningFlash) return;

  const delay = 900 + Math.random() * 2400;
  lightningTimer = window.setTimeout(() => {
    lightningFlash.animate(
      [
        { opacity: 0 },
        { opacity: 0.55 },
        { opacity: 0.08 },
        { opacity: 0.72 },
        { opacity: 0 }
      ],
      { duration: 260, easing: "ease-out" }
    );

    scheduleLightning();
  }, delay);
}

initAgroScene({
  canvasId: "three-canvas",
  onPhaseChange: (label) => {
    if (sceneStage) {
      sceneStage.textContent = label;
    }
  },
  onStormChange: (isStorm) => {
    stormMode = isStorm;
    if (!stormMode && lightningFlash) {
      lightningFlash.style.opacity = "0";
    }
    scheduleLightning();
  }
});

if (rememberedEmail) {
  emailInput.value = rememberedEmail;
  rememberMeInput.checked = true;
}

function clearErrors() {
  globalError.classList.remove("show");
  globalError.textContent = "";
  emailHint.textContent = "";
  passwordHint.textContent = "";
  emailInput.classList.remove("err-field");
  passwordInput.classList.remove("err-field");
}

function setLoading(isLoading) {
  loginBtn.disabled = isLoading;
  btnSpinner.style.display = isLoading ? "inline-block" : "none";
  btnText.textContent = isLoading ? "Signing in..." : "Login to Dashboard";
}

function showError(message) {
  globalError.textContent = message;
  globalError.classList.add("show");
}

function validateForm() {
  clearErrors();

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  let valid = true;

  if (!email) {
    emailInput.classList.add("err-field");
    emailHint.textContent = "Email is required.";
    valid = false;
  }

  if (!password) {
    passwordInput.classList.add("err-field");
    passwordHint.textContent = "Password is required.";
    valid = false;
  }

  return valid;
}

function togglePasswordVisibility() {
  const isVisible = passwordInput.type === "text";
  passwordInput.type = isVisible ? "password" : "text";
  togglePasswordBtn.textContent = isVisible ? "Show" : "Hide";
  togglePasswordBtn.setAttribute("aria-label", isVisible ? "Show password" : "Hide password");
  togglePasswordBtn.setAttribute("aria-pressed", String(!isVisible));
  togglePasswordBtn.classList.toggle("active", !isVisible);
}

togglePasswordBtn.addEventListener("click", togglePasswordVisibility);

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  setLoading(true);

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      showError(error.message || "Login failed. Please try again.");
      setLoading(false);
      return;
    }

    if (!data.session || !data.user) {
      showError("Login failed. No valid session returned.");
      setLoading(false);
      return;
    }

    sessionStorage.setItem("agromart_user", JSON.stringify(data.user));
    sessionStorage.setItem("agromart_token", data.session.access_token);

    if (rememberMeInput.checked) {
      localStorage.setItem("agromart_remember_email", email);
    } else {
      localStorage.removeItem("agromart_remember_email");
    }

    window.location.replace("/dashboard");
  } catch (error) {
    showError("Server/network error. Please check your connection.");
    setLoading(false);
  }
});

[emailInput, passwordInput].forEach((input) => {
  input.addEventListener("input", () => {
    if (globalError.classList.contains("show")) {
      clearErrors();
    }
  });
});

if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  window.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;

    root.style.setProperty("--mx", `${x * 8}px`);
    root.style.setProperty("--my", `${y * 6}px`);

    if (leftText) {
      leftText.style.transform = `translate3d(${x * 8}px, ${y * 6}px, 0)`;
    }

    if (loginCard) {
      loginCard.style.transform = `translate3d(${x * -5}px, ${y * -4}px, 0)`;
    }
  });

  window.addEventListener("mouseleave", () => {
    root.style.setProperty("--mx", "0px");
    root.style.setProperty("--my", "0px");

    if (leftText) {
      leftText.style.transform = "translate3d(0, 0, 0)";
    }

    if (loginCard) {
      loginCard.style.transform = "translate3d(0, 0, 0)";
    }
  });
}