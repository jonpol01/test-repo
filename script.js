document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  if (!canvas) {
    console.error('Canvas element not found');
    return;
  }

  const ctx = canvas.getContext('2d', { alpha: true });
  canvas.width = 640;
  canvas.height = 640;

  let petals = [];

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(isInitial = false) {
      this.x = Math.random() * canvas.width;
      this.y = isInitial 
        ? Math.random() * canvas.height 
        : -30 - Math.random() * 200;
      this.size = 9 + Math.random() * 11;
      this.speedY = 1.2 + Math.random() * 2.2;
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = 0.015 + Math.random() * 0.025;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.08;
      this.opacity = 0.65 + Math.random() * 0.35;
      this.hueShift = Math.random() * 15 - 5;
    }

    update() {
      this.y += this.speedY;
      this.wobble += this.wobbleSpeed;
      this.rotation += this.rotationSpeed;
      this.x += Math.sin(this.wobble) * 1.8;

      if (this.y > canvas.height + 50) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation + Math.sin(this.wobble) * 0.3);

      const petalColor = `hsl(348, 85%, ${62 + this.hueShift}%)`;
      ctx.fillStyle = petalColor;

      ctx.beginPath();
      ctx.moveTo(0, -this.size * 0.9);
      
      // Left side of petal
      ctx.quadraticCurveTo(
        -this.size * 0.75, 
        -this.size * 0.35, 
        -this.size * 0.45, 
        this.size * 0.55
      );
      
      // Bottom tip
      ctx.quadraticCurveTo(
        0, 
        this.size * 1.05, 
        this.size * 0.45, 
        this.size * 0.55
      );
      
      // Right side of petal
      ctx.quadraticCurveTo(
        this.size * 0.75, 
        -this.size * 0.35, 
        0, 
        -this.size * 0.9
      );
      
      ctx.fill();
      ctx.restore();
    }
  }

  function drawClockFace(cx, cy, radius) {
    // Outer shadow rim
    ctx.save();
    ctx.shadowColor = 'rgba(15, 23, 42, 0.25)';
    ctx.shadowBlur = 25;
    ctx.shadowOffsetY = 12;
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 18, 0, Math.PI * 2);
    ctx.fillStyle = '#f1e9d8';
    ctx.fill();
    ctx.restore();

    // Main clock body
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#fdfaf0';
    ctx.fill();
    
    // Bevel edge
    const gradient = ctx.createRadialGradient(
      cx - radius * 0.3, 
      cy - radius * 0.3, 
      radius * 0.6, 
      cx, 
      cy, 
      radius * 1.05
    );
    gradient.addColorStop(0, '#f8f1e3');
    gradient.addColorStop(1, '#e8d9c2');
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 22;
    ctx.stroke();
    ctx.restore();

    // Inner face
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 22, 0, Math.PI * 2);
    ctx.fillStyle = '#f9f4e8';
    ctx.fill();

    // Tick marks and numbers
    ctx.strokeStyle = '#1e2937';
    ctx.fillStyle = '#1e2937';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 1; i <= 12; i++) {
      const angle = (i * Math.PI / 6) - (Math.PI / 2);
      const isMajor = i % 3 === 0;

      // Tick line
      const innerR = radius - 38;
      const outerR = radius - 12;
      const x1 = cx + Math.cos(angle) * innerR;
      const y1 = cy + Math.sin(angle) * innerR;
      const x2 = cx + Math.cos(angle) * outerR;
      const y2 = cy + Math.sin(angle) * outerR;

      ctx.lineWidth = isMajor ? 7 : 3.5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Numbers (only at 12, 3, 6, 9 for clarity, others are ticks)
      if (isMajor) {
        const textR = radius - 68;
        const tx = cx + Math.cos(angle) * textR;
        const ty = cy + Math.sin(angle) * textR + (i === 12 ? 2 : 0);
        
        ctx.font = '700 26px system-ui';
        ctx.fillText(i === 12 ? '12' : (i).toString(), tx, ty);
      }
    }

    // Subtle center ring
    ctx.beginPath();
    ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.fillStyle = '#e2d9c8';
    ctx.fill();
  }

  function drawHands(cx, cy, radius) {
    const now = new Date();
    let hours = now.getHours() % 12;
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let milliseconds = now.getMilliseconds();

    const secondAngle = ((seconds + milliseconds / 1000) * 6) * (Math.PI / 180) - Math.PI / 2;
    const minuteAngle = ((minutes + seconds / 60) * 6) * (Math.PI / 180) - Math.PI / 2;
    const hourAngle = ((hours + minutes / 60) * 30) * (Math.PI / 180) - Math.PI / 2;

    // Hour hand
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(hourAngle);
    ctx.shadowColor = 'rgba(15, 23, 42, 0.4)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 4;
    
    ctx.strokeStyle = '#1e2937';
    ctx.lineWidth = 13;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.lineTo(0, -radius * 0.48);
    ctx.stroke();
    ctx.restore();

    // Minute hand
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(minuteAngle);
    ctx.shadowColor = 'rgba(15, 23, 42, 0.35)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetY = 3;
    
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(0, -radius * 0.72);
    ctx.stroke();
    ctx.restore();

    // Second hand
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(secondAngle);
    
    ctx.strokeStyle = '#e11d48';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.shadowColor = '#e11d48';
    ctx.shadowBlur = 8;
    
    ctx.beginPath();
    ctx.moveTo(0, 14);
    ctx.lineTo(0, -radius * 0.83);
    ctx.stroke();

    // Second hand tip
    ctx.fillStyle = '#e11d48';
    ctx.beginPath();
    ctx.arc(0, -radius * 0.83, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Center knob
    ctx.save();
    ctx.shadowColor = 'rgba(15, 23, 42, 0.3)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;
    
    ctx.beginPath();
    ctx.arc(cx, cy, 11, 0, Math.PI * 2);
    ctx.fillStyle = '#1e2937';
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#f1e9d8';
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const clockRadius = 235;

    drawClockFace(centerX, centerY, clockRadius);
    drawHands(centerX, centerY, clockRadius);

    // Update and draw petals
    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }

    // Occasional new petals from top
    if (Math.random() < 0.4) {
      const newPetal = new Petal();
      newPetal.y = -20;
      newPetal.x = Math.random() * canvas.width;
      petals.push(newPetal);
      
      // Limit total petals
      if (petals.length > 110) {
        petals.shift();
      }
    }

    requestAnimationFrame(animate);
  }

  // Initialize
  function init() {
    petals = [];
    for (let i = 0; i < 75; i++) {
      petals.push(new Petal());
    }
    animate();
  }

  init();
});