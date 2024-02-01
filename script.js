// Game variables
let level = 1;
let playerHealth = 100;
const maxPlayerHealth = 100;
let enemyHealth = 50;
let enemiesRemaining = 1;
let potionCount = 4;

// DOM elements
const levelElement = document.getElementById('level');
const playerElement = document.getElementById('player');
const enemyElement = document.getElementById('enemy');
const attackButton = document.getElementById('attack-btn');
const usePotionButton = document.getElementById('use-potion-btn');
const healthElement = document.getElementById('health');

// Update level, health, and enemy display
function updateDisplay() {
  levelElement.innerText = `Level ${level}`;
  healthElement.innerText = `Health: ${playerHealth}/${maxPlayerHealth}`;

  // Set different icons for the regular enemy and the dragon
  if (level === 3) {
    enemyElement.innerHTML = '<i class="fas fa-dragon fa-5x"></i>';
  } else {
    enemyElement.innerHTML = '<i class="fas fa-skull-crossbones fa-5x"></i>';
  }
}

// Player attacks enemy
function playerAttack() {
  const playerDamage = Math.floor(Math.random() * 20) + 10;
  enemyHealth -= playerDamage;
  updateDisplay();

  if (enemyHealth <= 0) {
    if (level < 3) {
      level++;
      enemyHealth = 50 * level;
      enemiesRemaining = level === 2 ? 2 : 1;
      updateDisplay();
    } else {
      enemyElement.style.display = 'none';
      attackButton.disabled = true;
      attackButton.innerHTML = '<i class="fas fa-trophy"></i> You won!';
    }
  } else {
    // Enemy attacks back
    const enemyDamage = Math.floor(Math.random() * 15) + 5;
    playerHealth -= enemyDamage;
    if (playerHealth <= 0) {
      attackButton.disabled = true;
      attackButton.innerText = 'Game Over';
    }
    updateDisplay();
  }
  enemyElement.style.color = 'red';
  setTimeout(() => {
    enemyElement.style.color = ''; // Reset color after 0.5 seconds
  }, 500); // Reset color after 0.5 seconds

  // Trigger animations
  const swordIcon = document.createElement('i');
  swordIcon.className = 'fas fa-sword swing';
  document.body.appendChild(swordIcon);

  // Position the sword relative to the enemy
  const enemyRect = enemyElement.getBoundingClientRect();
  const swordTop = enemyRect.top + window.scrollY + (enemyRect.height / 2);
  const swordLeft = enemyRect.left + window.scrollX + (enemyRect.width / 2);
  swordIcon.style.top = swordTop + 'px';
  swordIcon.style.left = swordLeft + 'px';

  // Animate the sword
  setTimeout(() => {
    swordIcon.style.transform = 'translate(-50%, -50%) rotate(-90deg)';
    setTimeout(() => {
      document.body.removeChild(swordIcon); // Remove the sword icon after the animation
    }, 500); // Animation duration
  }, 10); // Delay for the animation to start
}

// Player uses a potion to refill health
// Player uses a potion to refill health
function usePotion() {
    if (potionCount > 0 && playerHealth < maxPlayerHealth) {
      const potionRefillAmount = Math.floor(maxPlayerHealth * 0.3);
      playerHealth = Math.min(playerHealth + potionRefillAmount, maxPlayerHealth);
      potionCount--;
      updateDisplay();
  
      // Trigger potion animation
      const potionElement = document.getElementById('potion');
      potionElement.classList.add('potion-consume');
  
      setTimeout(() => {
        potionElement.classList.remove('potion-consume'); // Reset animation after 1 second
      }, 1000); // Reset animation after 1 second
    }
  }
  

// Event listeners
attackButton.addEventListener('click', playerAttack);
usePotionButton.addEventListener('click', usePotion);

// Initial display
updateDisplay();
// Player uses a potion to refill health
function usePotion() {
    if (potionCount > 0 && playerHealth < maxPlayerHealth) {
      const potionRefillAmount = Math.floor(maxPlayerHealth * 0.3);
      playerHealth = Math.min(playerHealth + potionRefillAmount, maxPlayerHealth);
      potionCount--;
      updateDisplay();
  
      // Trigger potion animation
      const potionElement = document.getElementById('potion');
      potionElement.classList.add('potion-consume');
  
      setTimeout(() => {
        potionElement.classList.remove('potion-consume'); // Reset animation after 1 second
      }, 1000); // Reset animation after 1 second
    }
  }
  
