document.getElementById('parentBtn').addEventListener('click', function() {
  const box = document.getElementById('messageBox');
  box.style.display = 'block';
  
  setTimeout(() => {
    box.style.display = 'none';
  }, 3000);
});

// إضافة تأثيرات للأزرار
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.role-btn');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});