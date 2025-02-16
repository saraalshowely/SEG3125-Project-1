document.addEventListener('DOMContentLoaded', () => {

  // QUOTE FORM
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      localStorage.setItem('flowType', 'quote');

      const fileInput = document.getElementById('fileUpload');
      const fileName = fileInput.files.length ? fileInput.files[0].name : 'No file selected';
      localStorage.setItem('quoteFile', fileName);

      localStorage.setItem('quoteMaterial', document.getElementById('material').value);
      localStorage.setItem('quoteColorFinish', document.getElementById('color').value + ' / ' + document.getElementById('finish').value);
      localStorage.setItem('quoteQuantity', document.getElementById('quantity').value || '1');

      let postProcessing = [];
      if(document.getElementById('optionSanding').checked) postProcessing.push('Sanding');
      if(document.getElementById('optionPainting').checked) postProcessing.push('Painting');
      if(document.getElementById('optionAssembly').checked) postProcessing.push('Assembly');
      localStorage.setItem('quotePostProcessing', postProcessing.join(', ') || 'None');

      localStorage.setItem('quoteInstructions', document.getElementById('instructions').value);

      window.location.href = 'client-info.html';
    });
  }

  // CLIENT INFO FORM
  const clientInfoForm = document.getElementById('clientInfoForm');
  if (clientInfoForm) {
    clientInfoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      localStorage.setItem('flowType', 'quote');
      localStorage.setItem('clientFullName', document.getElementById('fullName').value);
      localStorage.setItem('clientEmail', document.getElementById('emailAddress').value);
      localStorage.setItem('clientPhone', document.getElementById('phoneNumber').value);
      localStorage.setItem('clientShipping', document.getElementById('shippingAddress').value);
      localStorage.setItem('clientAdditional', document.getElementById('additionalInstructions').value);
      window.location.href = 'confirmation.html';
    });
  }

  // BOOKING FORM
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      localStorage.setItem('flowType', 'booking');
      localStorage.setItem('bookName', document.getElementById('bookName').value);
      localStorage.setItem('bookEmail', document.getElementById('bookEmail').value);
      localStorage.setItem('bookDate', document.getElementById('bookDate').value);
      localStorage.setItem('bookTime', document.getElementById('bookTime').value);
      localStorage.setItem('bookDetails', document.getElementById('bookDetails').value);
      window.location.href = 'confirmation.html';
    });
  }

  // CONTACT FORM
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      localStorage.setItem('flowType', 'contact');
      localStorage.setItem('contactName', document.getElementById('contactName').value);
      localStorage.setItem('contactEmail', document.getElementById('contactEmail').value);
      localStorage.setItem('contactSubject', document.getElementById('contactSubject').value);
      localStorage.setItem('contactMessage', document.getElementById('contactMessage').value);
      window.location.href = 'confirmation.html';
    });
  }

  // CONFIRMATION PAGE
  const confirmTitle = document.getElementById('confirmTitle');
  if (confirmTitle) {
    const flowType = localStorage.getItem('flowType') || '';
    if (flowType === 'quote') {
      confirmTitle.textContent = 'Thank You for Your 3D Printing Request!';
      document.getElementById('confirmMessage').textContent =
        'We’ve received your request and will begin reviewing it shortly. Below is a summary of your order:';
      document.getElementById('quoteDetails').style.display = 'block';

      document.getElementById('confirmMaterial').textContent = localStorage.getItem('quoteMaterial') || 'N/A';
      document.getElementById('confirmColorFinish').textContent = localStorage.getItem('quoteColorFinish') || 'N/A';
      document.getElementById('confirmQuantity').textContent = localStorage.getItem('quoteQuantity') || '1';
      const postProcessing = localStorage.getItem('quotePostProcessing') || 'None';
      const instructions = localStorage.getItem('quoteInstructions') || 'N/A';
      document.getElementById('confirmInstructions').textContent = postProcessing + ' | ' + instructions;

      document.getElementById('confirmName').textContent = localStorage.getItem('clientFullName') || 'N/A';
      document.getElementById('confirmEmail').textContent = localStorage.getItem('clientEmail') || 'N/A';
      document.getElementById('confirmPhone').textContent = localStorage.getItem('clientPhone') || 'N/A';
      document.getElementById('confirmShipping').textContent = localStorage.getItem('clientShipping') || 'N/A';
      document.getElementById('confirmAdditional').textContent = localStorage.getItem('clientAdditional') || 'N/A';
    } else if (flowType === 'booking') {
      confirmTitle.textContent = 'Thank You for Booking a Consultation!';
      document.getElementById('confirmMessage').textContent =
        'We look forward to discussing your project. Below is a summary of your booking details:';
      document.getElementById('bookingDetails').style.display = 'block';

      document.getElementById('bookConfirmName').textContent = localStorage.getItem('bookName') || 'N/A';
      document.getElementById('bookConfirmEmail').textContent = localStorage.getItem('bookEmail') || 'N/A';
      document.getElementById('bookConfirmDate').textContent = localStorage.getItem('bookDate') || 'N/A';
      document.getElementById('bookConfirmTime').textContent = localStorage.getItem('bookTime') || 'N/A';
      document.getElementById('bookConfirmDetails').textContent = localStorage.getItem('bookDetails') || 'N/A';
    } else if (flowType === 'contact') {
         const contactName = localStorage.getItem('contactName') || 'Customer';
         confirmTitle.textContent = `Thank You, ${contactName}!`;
         document.getElementById('confirmMessage').textContent =
           'We have received your message and will get back to you as soon as possible.';
    } else {
      confirmTitle.textContent = 'Confirmation';
      document.getElementById('confirmMessage').textContent = 'No information found.';
    }
  }
});