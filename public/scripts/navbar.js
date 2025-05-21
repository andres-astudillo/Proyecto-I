const divNavBarButtons = document.getElementById("navBarButtons");

const verifyCurrent = async () => {
    try {
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" }
        };
        const url = "/api/auth/current";
        let response = await fetch(url, options);
        response = await response.json();
        if (response.error) {
            divNavBarButtons.innerHTML = `
                <a class="btn btn-outline-success" href="/register" id="navBarBtnSingUp">Sing Up</a>
                <a class="btn btn-outline-success" href="/login" id="navBarBtnLogin">Login</a>
            `;
        } else {
            divNavBarButtons.innerHTML = `
                <a class="btn btn-outline-success" href="/profile" id="navBarBtnpProfile">Profile</a>
                <a class="btn btn-outline-success" href="/cart" id="navBarBtnCarts">Carts</a>
                <button class="btn btn-outline-success" type="submit" id="navBarBtnSignOut">Sing Out</button>
            `
        };
        document.getElementById("navBarBtnSignOut").addEventListener("click", async () => {
            try {
                const options = {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" }
                };
                const url = "/api/auth/signout";
                await fetch(url, options);
                localStorage.removeItem("token");
                location.replace("/");
            } catch (error) {
                console.error(error);
            }
        });
    } catch (error) {
        console.error(error);
    }
};

verifyCurrent();