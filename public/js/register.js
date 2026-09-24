class ToastManager {
    constructor(title, message, variant, duration) {
        this.title = title;
        this.message = message;
        this.variant = variant;
        this.duration = duration;
    }
    show() {
        const toastContainer = document.getElementById("toast-container-top-right");
        toastContainer.innerHTML = `
            <div class="toast-container" >
                <div class="toast " style="border-left: 4px solid ${this.variant};">
                    <div id="toast-content" >
                        <span class="toast-title" style="color: ${this.variant};">${this.title}</span><br>
                        <span class="toast-message">${this.message}</span>
                    </div>
                 </div>
            </div>
        `;
        setTimeout(() => {
            toastContainer.classList.add('hide');
            toastContainer.innerHTML = '';
        }, this.duration);
    }
    
}











const myFormBtn = document.getElementById('registerBtn');

myFormBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const secPassword = document.getElementById('password2').value;
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;

    const userData = { name, email, password };
    console.log(userData);

    if (password != secPassword) {

        return new ToastManager("Passwords Do Not Match!", "Check Your Password Inputs and Try Again", "coral", 4000).show();
    }

    try {
        const response = await fetch('/auth/register', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(userData) });

        const data = await response.json();
        return new ToastManager(data.message,"Login to your new account to proceed", "#c8ff36", 4000).show();
    } catch (error) {
        console.log(error)
    }

})


