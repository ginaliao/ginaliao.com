---
layout: page
title: Contact
---

<div id="js-form" class="form is-modal">
  <form action="https://formspree.io/gina@ginaliao.com" method="POST" class="js-contact">
    <fieldset class="fieldset">
      <legend class="fieldset-label">Got something to say? Send a message.</legend>
      <div class="field-group">
        <div class="field">
          <label for="name" class="field-label">Name</label>
          <input type="text" name="name" id="name" class="field-text-input">
        </div>
        <div class="field">
          <label for="email" class="field-label">Email</label>
          <input type="email" name="_replyto" id="email" class="field-text-input">
        </div>
      </div>

      <div class="field-group">
        <div class="field">
          <label for="message" class="field-label">Message</label>
          <textarea name="message" id="message" class="field-text-area"></textarea>
        </div>
      </div>
    </fieldset>
    
    <input type="hidden" name="_subject" value="New submission!" />
    <input type="text" name="_gotcha" class="u-hide" />
    <input type="hidden" name="_next" value="http://ginaliao.com/contact/thanks" />
    <button type="submit" class="js-submit button button--modal button--ajax"><span class="js-submit-text button-label">Send</span></button>
  </form> 
</div>
