export function buttons(a, b) {

    const plus = document.querySelector(".plus"),
        minus = document.querySelector(".minus"),
        num = document.querySelector(".num");


    plus.addEventListener("click", () => {
        a++;
        // a = (a < 10) ? "0" + a : a; display numbero com zero
        num.innerText = a;
    });

    minus.addEventListener("click", () => {
        if (a > 1) {
            a--;
            //  a = (a < 10) ? "0" + a : a; display numbero com zero
            num.innerText = a;
        }

    });

    const plus1 = document.querySelector(".plus1"),
        minus1 = document.querySelector(".minus1"),
        num1 = document.querySelector(".num1");

    plus1.addEventListener("click", () => {
        b++;
        // a = (a < 10) ? "0" + a : a; display numbero com zero
        num1.innerText = b;
    });

    minus1.addEventListener("click", () => {
        if (b > 1) {
            b--;
            //  a = (a < 10) ? "0" + a : a; display numbero com zero
            num1.innerText = b;
        }
    });
}
 