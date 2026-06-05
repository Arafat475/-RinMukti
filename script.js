function calculate() {
    var amount = document.getElementById("amount").value;
    var rate= document.getElementById("rate").value;
    var month= document.getElementById("month").value;

    var monthlyrate = rate / 100 / 12;

    var emi = amount * monthlyrate * Math.pow(1 + monthlyrate, month) / (Math.pow(1 + monthlyrate, month) - 1);
    
    var totalpayment = emi * month;
    var totalinterest = totalpayment - amount;
    var extracost = (totalinterest / amount) *100;

    emi = emi.toFixed(2);
    totalpayment = totalpayment.toFixed(2);
    totalinterest = totalinterest.toFixed(2);
    extracost = extracost.toFixed(2);

    document.getElementById("emi").textContent = "৳" + emi;
    document.getElementById("totalinterest").textContent = "৳" + totalinterest;
    document.getElementById("totalpayment").textContent = "৳" + totalpayment;
    document.getElementById("extracost").textContent = extracost + "%";

    // Show popup if interest rate is dangerous
  if (rate >= 25) {
    document.getElementById("popupFactBn").textContent = 
      "আপনি ৳" + amount + " ধার করছেন কিন্তু ফেরত দিচ্ছেন ৳" + totalpayment;
    document.getElementById("popupFactEn").textContent = 
      "You are borrowing ৳" + amount + " but paying back ৳" + totalpayment;
    document.getElementById("popupOverlay").classList.add("visible");
  }
  if (rate < 25) {
    smoothScrollTo("results");
  }

}

function closePopup() {
  document.getElementById("popupOverlay").classList.remove("visible");
}

function proceedAnyway() {
  document.getElementById("popupOverlay").classList.remove("visible");
  smoothScrollTo("results");
}

function smoothScrollTo(id) {
  var target = document.getElementById(id);
  var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
  var startPosition = window.pageYOffset;
  var distance = targetPosition - startPosition;
  var duration = 1000;
  var startTime = null;

  function ease(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function step(currentTime) {
    if (!startTime) startTime = currentTime;
    var progress = (currentTime - startTime) / duration;
    if (progress > 1) progress = 1;
    window.scrollTo(0, startPosition + distance * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}