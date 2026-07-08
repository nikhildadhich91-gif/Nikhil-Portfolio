// Programmatic canvas generator for the Lanyard ID Card textures.
// Returns data URLs for the front and back faces of the card.

export function generateCardTextures(): { front: string; back: string } {
  if (typeof window === 'undefined') {
    return { front: '', back: '' };
  }

  const width = 512;
  const height = 768;

  // Helper to create a canvas
  const createCanvas = () => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  };

  // --- FRONT FACE ---
  const canvasFront = createCanvas();
  const ctxFront = canvasFront.getContext('2d');
  if (ctxFront) {
    // 1. Background Gradient
    const bgGrad = ctxFront.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#0c0d10'); // matching --bg-raised dark
    bgGrad.addColorStop(0.5, '#050507');
    bgGrad.addColorStop(1, '#000000'); // matching --bg-base dark
    ctxFront.fillStyle = bgGrad;
    ctxFront.fillRect(0, 0, width, height);

    // 2. Neon Grid Lines (Background Tech Detail)
    ctxFront.strokeStyle = 'rgba(237, 239, 242, 0.02)';
    ctxFront.lineWidth = 1;
    for (let i = 0; i < width; i += 32) {
      ctxFront.beginPath();
      ctxFront.moveTo(i, 0);
      ctxFront.lineTo(i, height);
      ctxFront.stroke();
    }
    for (let j = 0; j < height; j += 32) {
      ctxFront.beginPath();
      ctxFront.moveTo(0, j);
      ctxFront.lineTo(width, j);
      ctxFront.stroke();
    }

    // 3. Glowing Border Accent
    ctxFront.strokeStyle = 'rgba(237, 239, 242, 0.1)';
    ctxFront.lineWidth = 8;
    ctxFront.strokeRect(16, 16, width - 32, height - 32);

    // 4. Top Accent Color Stripe (Signal White / Orange theme)
    const stripeGrad = ctxFront.createLinearGradient(0, 0, width, 0);
    stripeGrad.addColorStop(0, '#ff8a3d'); // Orange accent
    stripeGrad.addColorStop(0.5, '#edeff2'); // White text accent
    stripeGrad.addColorStop(1, '#64748b'); // Slate gray
    ctxFront.fillStyle = stripeGrad;
    ctxFront.fillRect(20, 20, width - 40, 8);

    // 5. Header Text
    ctxFront.fillStyle = '#8B93A1';
    ctxFront.font = 'bold 12px monospace';
    ctxFront.textAlign = 'center';
    ctxFront.fillText('SECURE DEV NETWORK ACCESS', width / 2, 60);

    // 6. Glowing Abstract Builder Hex Logo (Avatar)
    const centerX = width / 2;
    const centerY = 240;
    const radius = 90;

    // Draw glowing circles behind
    const glow = ctxFront.createRadialGradient(centerX, centerY, 10, centerX, centerY, radius + 20);
    glow.addColorStop(0, 'rgba(255, 138, 61, 0.15)');
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctxFront.fillStyle = glow;
    ctxFront.beginPath();
    ctxFront.arc(centerX, centerY, radius + 20, 0, Math.PI * 2);
    ctxFront.fill();

    // Draw Hexagon
    ctxFront.strokeStyle = '#ff8a3d';
    ctxFront.lineWidth = 3;
    ctxFront.shadowColor = '#ff8a3d';
    ctxFront.shadowBlur = 10;
    ctxFront.beginPath();
    for (let side = 0; side < 6; side++) {
      const angle = (side * Math.PI) / 3;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      if (side === 0) ctxFront.moveTo(x, y);
      else ctxFront.lineTo(x, y);
    }
    ctxFront.closePath();
    ctxFront.stroke();
    ctxFront.shadowBlur = 0; // reset shadow

    // Inner Stylized 'N' Logo
    ctxFront.strokeStyle = '#edeff2';
    ctxFront.lineWidth = 8;
    ctxFront.lineCap = 'round';
    ctxFront.lineJoin = 'round';
    ctxFront.beginPath();
    ctxFront.moveTo(centerX - 30, centerY + 35);
    ctxFront.lineTo(centerX - 30, centerY - 35);
    ctxFront.lineTo(centerX + 30, centerY + 35);
    ctxFront.lineTo(centerX + 30, centerY - 35);
    ctxFront.stroke();

    // Small Gold Microchip Graphics on Left
    ctxFront.fillStyle = '#d4af37'; // Gold
    ctxFront.fillRect(40, 100, 35, 30);
    ctxFront.strokeStyle = '#a67c00';
    ctxFront.lineWidth = 2;
    ctxFront.strokeRect(40, 100, 35, 30);
    // Grid in microchip
    ctxFront.beginPath();
    ctxFront.moveTo(48, 100); ctxFront.lineTo(48, 130);
    ctxFront.moveTo(58, 100); ctxFront.lineTo(58, 130);
    ctxFront.moveTo(40, 110); ctxFront.lineTo(75, 110);
    ctxFront.moveTo(40, 120); ctxFront.lineTo(75, 120);
    ctxFront.stroke();

    // 7. Developer Name & Role
    ctxFront.fillStyle = '#edeff2';
    ctxFront.font = 'bold 32px sans-serif';
    ctxFront.textAlign = 'center';
    ctxFront.fillText('NIKHIL DADHICH', width / 2, 410);

    ctxFront.fillStyle = '#ff8a3d';
    ctxFront.font = 'bold 14px monospace';
    ctxFront.fillText('SYSTEMS & SOFTWARE BUILDER', width / 2, 445);

    // Divider Line
    ctxFront.strokeStyle = 'rgba(237, 239, 242, 0.1)';
    ctxFront.lineWidth = 1;
    ctxFront.beginPath();
    ctxFront.moveTo(50, 480);
    ctxFront.lineTo(width - 50, 480);
    ctxFront.stroke();

    // 8. Specifications Details Grid
    ctxFront.textAlign = 'left';
    ctxFront.fillStyle = '#8B93A1';
    ctxFront.font = '11px monospace';

    ctxFront.fillText('CREDENTIAL TYPE', 50, 520);
    ctxFront.fillText('CLEARANCE LEVEL', 50, 560);
    ctxFront.fillText('OPERATIONAL BASE', 50, 600);

    ctxFront.fillStyle = '#edeff2';
    ctxFront.font = 'bold 12px monospace';
    ctxFront.fillText('FULL-STACK BUILDER', 220, 520);
    ctxFront.fillText('L3 DEV / SOLO OPERATOR', 220, 560);
    ctxFront.fillText('JAIPUR, RAJASTHAN, IN', 220, 600);

    // 9. Barcode rendering at the bottom
    const barcodeY = 660;
    const barcodeHeight = 40;
    ctxFront.fillStyle = '#edeff2';
    // Draw pseudo random lines for barcode
    let barcodeX = 50;
    const barcodePatterns = [2, 4, 1, 5, 2, 6, 1, 3, 2, 4, 8, 2, 1, 4, 3, 1, 6, 2, 1, 4, 2, 6, 2, 4, 1, 5, 2, 6];
    let patIdx = 0;
    while (barcodeX < width - 50) {
      const w = barcodePatterns[patIdx % barcodePatterns.length];
      if (patIdx % 2 === 0) {
        ctxFront.fillRect(barcodeX, barcodeY, w, barcodeHeight);
      }
      barcodeX += w + 2;
      patIdx++;
    }
    // Barcode subtitle
    ctxFront.textAlign = 'center';
    ctxFront.fillStyle = '#8B93A1';
    ctxFront.font = '10px monospace';
    ctxFront.fillText('ND-91-SOLO-SYSTEMS-APPROVED', width / 2, 720);
  }

  // --- BACK FACE ---
  const canvasBack = createCanvas();
  const ctxBack = canvasBack.getContext('2d');
  if (ctxBack) {
    // 1. Background Gradient (identical for consistency)
    const bgGrad = ctxBack.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#0c0d10');
    bgGrad.addColorStop(0.5, '#050507');
    bgGrad.addColorStop(1, '#000000');
    ctxBack.fillStyle = bgGrad;
    ctxBack.fillRect(0, 0, width, height);

    // Grid (Faint)
    ctxBack.strokeStyle = 'rgba(237, 239, 242, 0.01)';
    ctxBack.lineWidth = 1;
    for (let i = 0; i < width; i += 32) {
      ctxBack.beginPath();
      ctxBack.moveTo(i, 0); ctxBack.lineTo(i, height);
      ctxBack.stroke();
    }
    for (let j = 0; j < height; j += 32) {
      ctxBack.beginPath();
      ctxBack.moveTo(0, j); ctxBack.lineTo(width, j);
      ctxBack.stroke();
    }

    // Border
    ctxBack.strokeStyle = 'rgba(237, 239, 242, 0.1)';
    ctxBack.lineWidth = 8;
    ctxBack.strokeRect(16, 16, width - 32, height - 32);

    // Accent Stripe
    const stripeGrad = ctxBack.createLinearGradient(0, 0, width, 0);
    stripeGrad.addColorStop(0, '#64748b');
    stripeGrad.addColorStop(0.5, '#ff8a3d');
    stripeGrad.addColorStop(1, '#edeff2');
    ctxBack.fillStyle = stripeGrad;
    ctxBack.fillRect(20, 20, width - 40, 8);

    // Header Back
    ctxBack.fillStyle = '#ff8a3d';
    ctxBack.font = 'bold 12px monospace';
    ctxBack.textAlign = 'center';
    ctxBack.fillText('METRICS & CONTACT DIRECTORY', width / 2, 60);

    // 2. Metrics Sections
    ctxBack.textAlign = 'left';
    ctxBack.fillStyle = '#ff8a3d';
    ctxBack.font = 'bold 36px monospace';
    ctxBack.fillText('08+', 50, 140);
    ctxBack.fillStyle = '#edeff2';
    ctxBack.font = 'bold 12px monospace';
    ctxBack.fillText('SAAS PRODUCTS SHIPPED SOLO', 150, 125);
    ctxBack.fillStyle = '#8B93A1';
    ctxBack.font = '10px monospace';
    ctxBack.fillText('Production-grade serverless cloud apps', 150, 142);

    ctxBack.fillStyle = '#ff8a3d';
    ctxBack.font = 'bold 36px monospace';
    ctxBack.fillText('01M+', 50, 210);
    ctxBack.fillStyle = '#edeff2';
    ctxBack.font = 'bold 12px monospace';
    ctxBack.fillText('API CALLS ORCHESTRATED', 150, 195);
    ctxBack.fillStyle = '#8B93A1';
    ctxBack.font = '10px monospace';
    ctxBack.fillText('Google AI Studio & LLM pipelines', 150, 212);

    ctxBack.fillStyle = '#ff8a3d';
    ctxBack.font = 'bold 36px monospace';
    ctxBack.fillText('99.9%', 50, 280);
    ctxBack.fillStyle = '#edeff2';
    ctxBack.font = 'bold 12px monospace';
    ctxBack.fillText('DEPLOYMENT UPTIME TARGET', 150, 265);
    ctxBack.fillStyle = '#8B93A1';
    ctxBack.font = '10px monospace';
    ctxBack.fillText('Docker containerized deployments', 150, 282);

    // Divider Line
    ctxBack.strokeStyle = 'rgba(237, 239, 242, 0.1)';
    ctxBack.lineWidth = 1;
    ctxBack.beginPath();
    ctxBack.moveTo(50, 320);
    ctxBack.lineTo(width - 50, 320);
    ctxBack.stroke();

    // 3. Playbook / Credo Statement
    ctxBack.fillStyle = '#edeff2';
    ctxBack.font = 'bold 12px monospace';
    ctxBack.fillText('THE BUILDER ETHOS:', 50, 355);

    ctxBack.fillStyle = '#8B93A1';
    ctxBack.font = 'italic 11px sans-serif';
    // Multi-line statement
    const statement = [
      'Carrying a Business Analyst\'s discipline for details,',
      'detailed documentation, and cost optimizations.',
      'Developing production apps with a strict focus on latency,',
      'logo integrity, and modular code systems.'
    ];
    let statementY = 380;
    statement.forEach(line => {
      ctxBack.fillText(line, 50, statementY);
      statementY += 18;
    });

    // Divider Line
    ctxBack.strokeStyle = 'rgba(237, 239, 242, 0.1)';
    ctxBack.lineWidth = 1;
    ctxBack.beginPath();
    ctxBack.moveTo(50, 470);
    ctxBack.lineTo(width - 50, 470);
    ctxBack.stroke();

    // 4. Contact Grid
    ctxBack.fillStyle = '#ff8a3d';
    ctxBack.font = 'bold 11px monospace';
    ctxBack.fillText('COMM CHANNELS', 50, 500);

    ctxBack.fillStyle = '#8B93A1';
    ctxBack.font = '11px monospace';
    ctxBack.fillText('EMAIL:', 50, 530);
    ctxBack.fillText('LINKEDIN:', 50, 560);
    ctxBack.fillText('GITHUB:', 50, 590);

    ctxBack.fillStyle = '#edeff2';
    ctxBack.font = 'bold 11px monospace';
    ctxBack.fillText('nikhildadhich91@gmail.com', 150, 530);
    ctxBack.fillText('linkedin.com/in/nikhil-dadhich91', 150, 560);
    ctxBack.fillText('github.com/nikhildadhich91-gif', 150, 590);

    // 5. QR Code simulator on bottom right & Logo on bottom left
    const qrSize = 100;
    const qrX = width - 150;
    const qrY = 630;

    // QR Box background
    ctxBack.fillStyle = '#ffffff';
    ctxBack.fillRect(qrX, qrY, qrSize, qrSize);
    ctxBack.fillStyle = '#000000';
    // Draw corner anchor patterns of a QR code
    // Top Left Anchor
    ctxBack.fillRect(qrX, qrY, 30, 30);
    ctxBack.fillStyle = '#ffffff';
    ctxBack.fillRect(qrX + 6, qrY + 6, 18, 18);
    ctxBack.fillStyle = '#000000';
    ctxBack.fillRect(qrX + 10, qrY + 10, 10, 10);

    // Top Right Anchor
    ctxBack.fillRect(qrX + 70, qrY, 30, 30);
    ctxBack.fillStyle = '#ffffff';
    ctxBack.fillRect(qrX + 76, qrY + 6, 18, 18);
    ctxBack.fillStyle = '#000000';
    ctxBack.fillRect(qrX + 80, qrY + 10, 10, 10);

    // Bottom Left Anchor
    ctxBack.fillRect(qrX, qrY + 70, 30, 30);
    ctxBack.fillStyle = '#ffffff';
    ctxBack.fillRect(qrX + 6, qrY + 76, 18, 18);
    ctxBack.fillStyle = '#000000';
    ctxBack.fillRect(qrX + 10, qrY + 80, 10, 10);

    // Random small QR dots elsewhere
    ctxBack.fillStyle = '#000000';
    for (let r = 0; r < 14; r++) {
      for (let c = 0; c < 14; c++) {
        // Skip anchors
        if ((r < 5 && c < 5) || (r < 5 && c > 8) || (r > 8 && c < 5)) continue;
        if (Math.random() > 0.45) {
          ctxBack.fillRect(qrX + c * 7 + 1, qrY + r * 7 + 1, 6, 6);
        }
      }
    }

    // Logo / Text on bottom left
    ctxBack.textAlign = 'left';
    ctxBack.fillStyle = '#edeff2';
    ctxBack.font = 'bold 20px monospace';
    ctxBack.fillText('NIKHIL D.', 50, 670);
    
    ctxBack.fillStyle = '#8B93A1';
    ctxBack.font = '9px monospace';
    ctxBack.fillText('SYSTEM DESIGN LABS', 50, 690);
    ctxBack.fillText('ESTABLISHED 2024', 50, 705);
    ctxBack.fillText('JAIPUR METRO AREA', 50, 720);
  }

  return {
    front: canvasFront.toDataURL('image/png'),
    back: canvasBack.toDataURL('image/png'),
  };
}
