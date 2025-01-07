const container = document.querySelector('.container')
const signUpBtn = document.querySelector('.green-bg button')

signUpBtn.addEventListener('click', () => {
    container.classList.toggle('change');
})


function showScreen(screenId) {
    // Tüm ekranların 'active' sınıfını kaldır
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
  
    // İstenen ekranı 'active' yap
    document.getElementById(screenId).classList.add('active');
  }


  const cart = {
    items: [],
    total: 0,
  };
  
  // Sepete ürün ekleme/çıkarma
  function updateCart(productName, productPrice, change) {
    // Sepet içinde ürün bul
    let product = cart.items.find(item => item.name === productName);
  
    if (!product && change > 0) {
      // Ürün yoksa ve miktar artırılıyorsa yeni ürün ekle
      product = { name: productName, price: productPrice, quantity: 0 };
      cart.items.push(product);
    }
  
    if (product) {
      // Miktarı güncelle
      product.quantity += change;
  
      // Ürün miktarı sıfır veya daha azsa ürünü sepetten kaldır
      if (product.quantity <= 0) {
        cart.items = cart.items.filter(item => item.name !== productName);
      }
    }
  
    // Toplamı güncelle
    cart.total += productPrice * change;
    if (cart.total < 0) cart.total = 0; // Negatif toplamı engelle
  
    // Miktarı ve toplamı güncelle
    updateQuantityDisplay(productName, product ? product.quantity : 0);
    updateCartSummary();
  }
  
  // Ürün miktarını arayüzde güncelle
  function updateQuantityDisplay(productName, quantity) {
    const quantityId = `quantity-${productName.toLowerCase().replace(' ', '-')}`;
    document.getElementById(quantityId).textContent = quantity;
  }
  
  // Sepet özetini güncelle
  function updateCartSummary() {
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotalPrice = cart.total;
  
    document.getElementById('cart-total-items').textContent = totalItems;
    document.getElementById('cart-total-price').textContent = `${cartTotalPrice} TL`;
  }
  
  // Ödeme ekranını doldur
  function populatePaymentScreen() {
    const paymentSummary = document.getElementById('payment-summary');
    paymentSummary.innerHTML = ''; // Mevcut içeriği temizle
  
    cart.items.forEach(item => {
      const productLine = document.createElement('p');
      productLine.textContent = `${item.name} x${item.quantity} - ${item.price * item.quantity} TL`;
      paymentSummary.appendChild(productLine);
    });
  
    const totalLine = document.createElement('p');
    totalLine.textContent = `Toplam: ${cart.total} TL`;
    paymentSummary.appendChild(totalLine);
  }
  
  // Ödeme ekranına geçişte tetiklenir
  document.querySelector('button[onclick="showScreen(\'payment-screen\')"]').addEventListener('click', populatePaymentScreen);
  
  // Sayfa değişikliğinde sepet ikonunun görünmesini sağlar
  function showScreen(screenId) {
    // Tüm ekranların 'active' sınıfını kaldır
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
  
    // İstenen ekranı 'active' yap
    document.getElementById(screenId).classList.add('active');
  }