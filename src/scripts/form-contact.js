document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.getElementById('sendBtn');
  const sendProgress = document.querySelector('.send-progress');
  const sentToast = document.getElementById('sentToast');
  const errorToast = document.getElementById('errorToast');
  const successToast = document.getElementById('successToast');
  const contactForm = document.getElementById('contactForm');

  let isHolding = false;
  let holdTimer;
  let progressTimer;

  function showToast(toastElement, duration = 3000) {
    if (toastElement) {
      toastElement.classList.add('show');
      setTimeout(() => toastElement.classList.remove('show'), duration);
    }
  }

  function hideAllToasts() {
    [sentToast, errorToast, successToast].forEach(toast => {
      if (toast) toast.classList.remove('show');
    });
  }

  if (sendBtn) {
    sendBtn.addEventListener('mousedown', startHold);
    sendBtn.addEventListener('mouseup', endHold);
    sendBtn.addEventListener('mouseleave', endHold);
    sendBtn.addEventListener('touchstart', startHold);
    sendBtn.addEventListener('touchend', endHold);
  }

  function startHold() {
    if (isHolding) return;
    isHolding = true;
    let progress = 0;
    const duration = 900;
    const interval = 10;
    const step = (interval / duration) * 100;

    if (sendProgress) {
      sendProgress.style.transition = 'none';
      progressTimer = setInterval(() => {
        progress += step;
        sendProgress.style.width = Math.min(progress, 100) + '%';
        if (progress >= 100) {
          clearInterval(progressTimer);
          sendMessage();
        }
      }, interval);
    }
  }

  function endHold() {
    if (!isHolding) return;
    isHolding = false;
    clearInterval(progressTimer);
    if (sendProgress) {
      sendProgress.style.transition = 'width 0.3s ease';
      sendProgress.style.width = '0%';
    }
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function sendMessage() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    hideAllToasts();

    if (!name || !email || !message) {
      showToast(errorToast, 4000);
      endHold();
      return;
    }

    if (!validateEmail(email)) {
      if (errorToast) {
        const originalText = errorToast.innerHTML;
        errorToast.innerHTML = '<i class="fa-solid fa-exclamation-triangle"></i> Ingresa un email válido';
        showToast(errorToast, 4000);
        setTimeout(() => errorToast.innerHTML = originalText, 4000);
      }
      endHold();
      return;
    }

    if (sendBtn) {
      sendBtn.classList.add('success');
      const sendLabel = sendBtn.querySelector('.send-label');
      if (sendLabel) sendLabel.textContent = '¡Enviado!';
    }
    
    showToast(successToast, 4000);
    
    if (sentToast) {
      setTimeout(() => sentToast.classList.add('show'), 500);
    }
    
    setTimeout(() => {
      if (sendBtn) {
        sendBtn.classList.remove('success');
        const sendLabel = sendBtn.querySelector('.send-label');
        if (sendLabel) sendLabel.textContent = 'Mantener para enviar';
      }
      if (sentToast) sentToast.classList.remove('show');
      if (contactForm) contactForm.reset();
    }, 4000);
    
    endHold();
  }

  const inputs = document.querySelectorAll('.input-ghost');
  inputs.forEach(input => {
    input.addEventListener('focus', () => input.style.transform = 'translateY(-3px)');
    input.addEventListener('blur', () => input.style.transform = 'translateY(0)');
  });

  const bubbles = document.querySelectorAll('.bubble');
  bubbles.forEach(bubble => {
    bubble.addEventListener('mouseenter', () => bubble.style.transform = 'translateY(-8px) scale(1.08) rotate(-6deg)');
    bubble.addEventListener('mouseleave', () => bubble.style.transform = 'translateY(0) scale(1) rotate(0deg)');
  });

  [errorToast, successToast].forEach(toast => {
    if (toast) toast.addEventListener('click', () => toast.classList.remove('show'));
  });

  const messageTextarea = document.getElementById('message');
  if (messageTextarea) {
    messageTextarea.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 200) + 'px';
    });
  }
});