let maindiv = document.getElementById('pannelcreate');
function activity1() {
    let text = `
    <div class='divide'>
    <div style='margin-top: 2vw;'>
        <br>
        <h4 class="center-text fs-20px fw-600"></h4>

        <div class="fs-16px">
        <h5>Roots of Equation - Non-Linear Equation (Newton Raphson Method)</h5>
        <p>Learning Objective: Find x1 and x2</p>
        </div>

        <button class='btn btn-info std-btn' style='position: relative; left: 50vw;' onclick='start_act1();' id='temp-btn-1' >Next</button>
    </div>
    </div>
    `;
    maindiv.innerHTML = text;
    setTimeout(() => { MathJax.typeset(); }, 300);
}
//for starting first activity
function start_act1() {
    let temp_btn = document.getElementById('temp-btn-1');
    if (temp_btn) {
        temp_btn.remove();
    }
    let btn_text = get_collapse_btn_text("Calculate x<sub>1</sub> and x2<sub>2</sub> values", "tb1-box");
    let text = `
    ${btn_text}
    <div class='collapse divide' style='style='margin-top: 2vw; 'width: 80%; margin: auto;' id='tb1-box'>


        <br>

        <p style='text-align: center; font-size: 18px;'>equation 1 => <span style='display: inline-block;' >$$ \\ \\ \\ \\ x_1^2 + x_1x_2 = ${a} $$</span></p>
        <p style='text-align: center; font-size: 18px;'>equation 2 => <span style='display: inline-block;' >$$ \\ \\ \\ \\ x_2 + 3x_1x_2^2 = ${b} $$</span></p>

        <p style='font-size: 18px;'>Solve the set of non-linear equations. Take the initial guess  <span style='display: inline-block;' >$$ x_1  = 1.5
         \\ and \\ x_2 = 3.5 $$</span></p>


        <p style='font-size: 18px;'>For First Interation</p>

        <p style='text-align: center; font-size: 18px;'><span style='display: inline-block;' >$$ f_1 = x_1^2 + x_1x_2 - ${a} $$</span></p>

        <p style='text-align: center; font-size: 18px;'><span style='display: inline-block;' >$$ f_2 = x_2 + 3x_1x_2^2 - ${b} $$</span></p>

        <p style='text-align: center; font-size: 18px;'>
            <span style='display: inline-block;' >
                $$ \\frac{\\partial f_1}{\\partial x_1} = 2x_1 + x_2 $$
            </span>
            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='pd1-inp' > <span id='pd1-val-sp'></span>
        </p>

        <p style='text-align: center; font-size: 18px;'>
            <span style='display: inline-block;' >
                $$ \\frac{\\partial f_1}{\\partial x_2} = x_1 $$
            </span>
            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='pd2-inp' > <span id='pd2-val-sp'></span>
        </p>

        <p style='text-align: center; font-size: 18px;'>
            <span style='display: inline-block;' >
                $$ \\frac{\\partial f_2}{\\partial x_1} = 3x_2^2 $$
            </span>
            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='pd3-inp' > <span id='pd3-val-sp'></span>
        </p>

        <p style='text-align: center; font-size: 18px;'>
            <span style='display: inline-block;' >
                $$ \\frac{\\partial f_2}{\\partial x_2} = 1 + 6x_1x_2 $$
            </span>
            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='pd4-inp' > <span id='pd4-val-sp'></span>
        </p>


        <p style='text-align: center; font-size: 18px;'>
            <span style='display: inline-block;' >
                $$ new  \\ x_1 \\ value = (previous \\ x_1 \\ value) - \\frac{f_1\\frac{\\partial f_2}{\\partial x_2} - f_2\\frac{\\partial f_1}{\\partial x_2}}{\\frac{\\partial f_1}{\\partial x_1}\\frac{\\partial f_2}{\\partial x_2} - \\frac{\\partial f_1}{\\partial x_2}\\frac{\\partial f_2}{\\partial x_1}} $$
            </span>
        </p>

        
        <p style='text-align: center; font-size: 18px;'>
            <span style='display: inline-block;' >
                $$ new  \\ x_2 \\ value = (previous \\ x_2 \\ value) - \\frac{f_2\\frac{\\partial f_1}{\\partial x_1} - f_1\\frac{\\partial f_2}{\\partial x_1}}{\\frac{\\partial f_1}{\\partial x_1}\\frac{\\partial f_2}{\\partial x_2} - \\frac{\\partial f_1}{\\partial x_2}\\frac{\\partial f_2}{\\partial x_1}} $$
            </span>
        </p>

        <br>

        <div style='text-align: center;'><button class='btn btn-info std-btn' onclick='verify_a1();'  id='temp-btn-120' >Verify</button></div>
        

    
        <br> 

        <div id='nxt' style='display: none;'>
            <div id='tab-1'></div>
        </div>
    </div>

    `;
    maindiv.innerHTML += text;
    hide_all_steps();
    setTimeout(() => { show_step('tb1-box'); }, 150);
    internal_calculations();
    load_table();
    setTimeout(() => { MathJax.typeset(); }, 300);
}
function load_table() {
    let ele = document.getElementById('tab-1');
    let header = ['S no.', 'x<sub>1</sub>', 'x<sub>2</sub>'];
    let tb = new Verify_Rows_Cols_Custom_Fixed_Update1(header, tb2_data, [0], [[1, 2]], '', ele, true, true, () => { }, 6);
    tb.load_table();
}
function internal_calculations() {
    let init1 = 1.5;
    let init2 = 3.5;
    pd1 = 2 * init1 + init2;
    pd2 = init1;
    pd3 = 3 * (Math.pow(init2, 2));
    pd4 = 1 + 6 * init1 * init2;
}
function verify_a1() {
    let btn = document.getElementById('temp-btn-120');
    console.log(`pd1 => ${pd1}, pd2 => ${pd2}, pd3 => ${pd3}, pd4 => ${pd4}`);
    let inp1 = document.getElementById('pd1-inp');
    let sp1 = document.getElementById('pd1-val-sp');
    let inp2 = document.getElementById('pd2-inp');
    let sp2 = document.getElementById('pd2-val-sp');
    let inp3 = document.getElementById('pd3-inp');
    let sp3 = document.getElementById('pd3-val-sp');
    let inp4 = document.getElementById('pd4-inp');
    let sp4 = document.getElementById('pd4-val-sp');
    if (!verify_values(parseFloat(inp1.value), pd1)) {
        alert('del f1 / del x1 value is incorrect, calculate again.');
        return;
    }
    if (!verify_values(parseFloat(inp2.value), pd2)) {
        alert('del f1 / del x2  value is incorrect, calculate again.');
        return;
    }
    if (!verify_values(parseFloat(inp3.value), pd3)) {
        alert('del f2 / del x1  value is incorrect, calculate again.');
        return;
    }
    if (!verify_values(parseFloat(inp4.value), pd4)) {
        alert('del f2 / del x2  value is incorrect, calculate again.');
        return;
    }
    btn.remove();
    inp1.remove();
    sp1.innerText = `${pd1.toFixed(4)}`;
    inp2.remove();
    sp2.innerText = `${pd2.toFixed(4)}`;
    inp3.remove();
    sp3.innerText = `${pd3.toFixed(4)}`;
    inp4.remove();
    sp4.innerText = `${pd4.toFixed(4)}`;
    alert('Your entered values are correct!!');
    let ele = document.getElementById('nxt');
    ele.style.display = 'block';
}
activity1();
//# sourceMappingURL=activity1.js.map