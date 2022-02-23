
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

const menuIconBtn = document.querySelector('[data-btn-menu]');
const sidebar = document.querySelector('[data-sidebar]');
const javaPage = document.getElementById('javaPage');
const cPlusPage = document.getElementById('cPlusPage');
const cSharpPage = document.getElementById('cSharpPage');
const webDev = document.getElementById("webPage");
const home = document.getElementById("home");
const python = document.getElementById("pythonPage");
const mysql = document.getElementById("sqlPage");
const settings = document.getElementById("settingsPage");
const contact = document.getElementById("contactPage");
const mainContent = document.getElementById("mainContent");
mainContent.addEventListener("click", ()=>
{
  sidebar.classList.remove("open");
});

menuIconBtn.addEventListener("click", () =>
{

  sidebar.classList.toggle('open');
  
   
});
home.title = "Home";
javaPage.title = "Java Projects";
cPlusPage.title = "C++ Projects";
cSharpPage.title = "C# Projects";
python.title = "Python Projects";
webDev.title = "Web Projects";
mysql.title = "MySQL Projects";
settings.title = "Settings";
contact.title = "Contact";

//




const cadrePeSecunda = 60;
const dimensiune_Nava = 30; // in pixeli
const vitezaRotire = 360; // rotire in grade/secunda
const vitezaMiscare = 5; // reprezinta viteza de miscare a navei in pixeli/secunda
const durataExplozie = 0.3 // duratat exploziei
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
const frecare = 0.7; // coeficient de frecare (0 = fara frecare)
const nrAsteroizi = 5; // numar de inceput asteroizi 
var intervalAsteroid = Math.ceil(Math.random() * (4 - 1) + 1);
var marimeAsteroid = 0; // marime initiala in pixeli a asteroidului // 50 - 70 - 80 - 100
var scor = 0; 
var esteLovit = false;
const salvareScor = "ScorMaxim";
if (intervalAsteroid === 1)
{
    marimeAsteroid = 50;
}
if (intervalAsteroid === 2)
{
    marimeAsteroid = 70;
}
if (intervalAsteroid === 3)
{
    marimeAsteroid = 80;
}
if (intervalAsteroid === 4)
{
    marimeAsteroid = 100;
}
const vitezaAsteroid = 50; // viteza de start a asteroidului in pixeli/secunda
const aster_vert = 10; // numar de laturi asteroizi
const forma_aster = 0.4 // forma asteroidului
const punct_centru = false;
const show_collision_circle = false;
const timpInv = 3 // duratie invulnerabilitate
const durataAparitie = 0.1 // durata aparitiei si disparitie in timpul invulnerabilitatii
const nrRachete = 3; // maximul nr de rachete
const vitRachete = 500; // viteza laser pixeli/sec
const distantaRacheta = 1 // distanta maxima de tragere a rachetelor
var numarator = 0;
const dispText = 2.5; // cand dispare textul in sec
const marimeText = 40; // marime text
const vieti = 3; // numarul de vieti
var scorMaxim = 0;
setInterval(update, 1000/ cadrePeSecunda);

var nivel, aster, navaS, text, transText, vietiCurente;
jocNow();



var nava = newNava();

// asteroizi
var ast = [];
creazaAsteroizi();


// setare event handlers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function creazaAsteroizi()
{
    ast = [];
    var x, y;
    for (var i = 0 ; i < nrAsteroizi + nivel ; i ++)
    {
        do {
        x = Math.floor(Math.random() * canvas.clientWidth);
        y = Math.floor(Math.random() * canvas.clientHeight);
        }
        while (distantaAN(nava.x, nava.y, x, y) < marimeAsteroid * 2 + nava.r);
        ast.push(newAsteroid(x, y, Math.ceil(marimeAsteroid / 2)));
    }
}

function distrugereAsteroid(index)
{
    var x = ast[index].x;
    var y = ast[index].y;
    var d = ast[index].d;
    if (numarator === 4 && intervalAsteroid === 4)
    {ast.splice(index, 1);
    
    }
    if (numarator === 3 && intervalAsteroid === 3)
    {ast.splice(index, 1);}
    if (numarator === 2 && intervalAsteroid === 2)
    {ast.splice(index, 1);}
    if (numarator === 1 && intervalAsteroid === 1)
    {ast.splice(index, 1);}

    if (scor > scorMaxim) {
        scorMaxim = scor;
        localStorage.setItem(salvareScor, scorMaxim);
    }

    // nivel nou cand nu mai sunt asteroizi
    if (ast.length == 0)
    {
        nivel++;
        newNivel();
    }
}

function distantaAN(x1, y1, x2, y2)

{
    return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2 - y1, 2));
}

function explozieNava()
{
    nava.explozie = Math.ceil(durataExplozie * cadrePeSecunda)
}

function gameOver()
{
    nava.moarta = true;
    text = "Game Over";
    transText = 1.0;
}

function keyDown(/**  @type {KeyboardEvent} */ ev )

{
    if (nava.moarta)
    {
        return;
    }
    switch(ev.keyCode)
    {   
    case 90:  // sageata stanga (rotire nava spre stanga)
        nava.rot = vitezaRotire / 180 * Math.PI / cadrePeSecunda;
        break;

    case 38: // sageata sus (inaintare nava)
        nava.inMiscare = true;

        break;

    case 67: // sageata dreapta (rotire nava spre dreapta)
        nava.rot = -vitezaRotire / 180 * Math.PI / cadrePeSecunda;
        break;

    case 88: // x (rachete)
        trageRachete();
        
        break;
   
    }
}

function keyUp( /** @type {KeyboardEvent} */ ev )
{
    if (nava.moarta)
    {
        return;
    }
    switch(ev.keyCode)
    {
        case 90:  // sageata stanga (oprire rotire nava spre stanga)
        nava.rot = 0;
            break;
    
        case 38: // sageata sus (oprire inaintare nava)
            nava.inMiscare = false;
            break;
    
         case 67: // sageata dreapta (oprire rotire nava spre dreapta)
         nava.rot = 0;
            break;

        case 88: // x (rachete)
        trageRachete();
            nava.poateTrage = true;
         break;
       
    }
}

function newAsteroid(x, y , d)
{
    var nivelMulti = 1 + 0.1 * nivel;
    var ast = 
    {
        x: x,
        y: y,
        xv: Math.random() * vitezaAsteroid * nivelMulti / cadrePeSecunda * (Math.random() < 0.5 ? 1 : -1),
        yv: Math.random() * vitezaAsteroid * nivelMulti / cadrePeSecunda * (Math.random() < 0.5 ? 1 : -1),
        d: d,
        u: Math.random() * Math.PI * 2,
        vert: Math.floor(Math.random() * (aster_vert + 1) + aster_vert / 2),
        offs: [], // reprezinta un offset pentru forma asteroidului
        esteLovit: false,
        intervalAsteroi: intervalAsteroid
        
    };
    // 
    for (var i = 0; i < ast.vert; i++)
    {
        ast.offs.push(Math.random() * forma_aster * 2 + 1 - forma_aster);
    }

    return ast;
}

function jocNow()
{
    nivel = 0;
    nava = newNava();
    vietiCurente = vieti;
    scorMaxim = localStorage.getItem(salvareScor);
    scor = 0;

    var scoreStr = localStorage.getItem(salvareScor);
            if (scoreStr == null) {
                scorMaxim = 0;
            } else {
                scorMaxim = parseInt(scoreStr);
            }
    newNivel();

}

function newNivel()
{
    text = "Nivel " + (nivel + 1);
    transText = 1.0;

    creazaAsteroizi();
}

function newNava()
{
    return {
        x: canvas.clientWidth / 2,
        y: canvas.clientHeight / 2,
        r: dimensiune_Nava / 2,
        d: 90 / 180 * Math.PI, // unghi 
        rot: 0, 
        explozie: 0,
        inMiscare: false,
        aparitie: Math.ceil(durataAparitie * cadrePeSecunda),
        nrAparitii: Math.ceil(timpInv / durataAparitie),
        poateTrage: true,
        rachete: [],
        moarta : false,
        miscare:
        {
            x: 0,
            y: 0 
        }
    
    }
}

function desenareNava(x, y, u, culoare = "white")
{
    context.strokeStyle = culoare;
    context.lineWidth = dimensiune_Nava / 20;
    context.beginPath();
    context.moveTo( // varful navei
        x + 4 / 3 * nava.r * Math.cos(u),
        y - 4 / 3 * nava.r * Math.sin(u)
    );

    context.lineTo( // spate stanga nava
        x - nava.r * (2 / 3 * Math.cos(u) + Math.sin(u)),
        y + nava.r * (2 / 3 * Math.sin(u) - Math.cos(u))
    );
    context.lineTo( // spate  nava
       x - nava.r * ( 2 / 3 * Math.cos(u) - Math.sin(u)),
       y + nava.r * ( 2 / 3 * Math.sin(u) + Math.cos(u))
    );

    context.closePath();

    context.stroke();
}

function trageRachete()
{
    // creare rachete
    if (nava.poateTrage && nava.rachete.length < nrRachete)
    {
        nava.rachete.push({// tragem din varful navei
            x: nava.x + 4 / 3 * nava.r * Math.cos(nava.d),
            y: nava.y - 4 / 3 * nava.r * Math.sin(nava.d),
            xv: vitRachete * Math.cos(nava.d) / cadrePeSecunda,
            yv: -vitRachete * Math.sin(nava.d) / cadrePeSecunda,
            distanta: 0,
        });
    }

    nava.poateTrage = false;
}

function update()
{
    var ap = nava.nrAparitii % 2 == 0 ;

    var inExplozie = nava.explozie > 0;
    // desenam spatiul
    context.fillStyle = "black";
    context.fillRect (0, 0 , canvas.clientWidth, canvas.clientHeight)
    

    // accelerare nava

    if (nava.inMiscare && !nava.moarta)
    {
        nava.miscare.x += vitezaMiscare * Math.cos(nava.d) / cadrePeSecunda;
        nava.miscare.y -= vitezaMiscare * Math.sin(nava.d) / cadrePeSecunda;
        
        if (!inExplozie && ap)
        {
        context.fillStyle = "red";
        context.strokeStyle = "yellow";
        context.lineWidth = dimensiune_Nava / 10;
        context.beginPath();
        context.moveTo( // spate stanga nava
            nava.x - nava.r * (2 / 3 * Math.cos(nava.d) + 0.5 * Math.sin(nava.d)),
            nava.y + nava.r * (2 / 3 * Math.sin(nava.d) - 0.5 * Math.cos(nava.d))
        );
    
        context.lineTo( // spate centru
            nava.x - nava.r * 6 / 3 * Math.cos(nava.d),
            nava.y + nava.r * 6 / 3 * Math.sin(nava.d) 
        );
        context.lineTo( // spate  dreapta
            nava.x - nava.r * ( 2 / 3 * Math.cos(nava.d) - 0.5 * Math.sin(nava.d)),
            nava.y + nava.r * ( 2 / 3 * Math.sin(nava.d) + 0.5 * Math.cos(nava.d))
        );
    
        context.closePath();
        context.fill();
        context.stroke();
        }

    }
    else 
    {
        nava.miscare.x -= frecare * nava.miscare.x / cadrePeSecunda;
        nava.miscare.y -= frecare * nava.miscare.y / cadrePeSecunda;
    }
    // miscare rachete
    for ( var i = nava.rachete.length - 1; i >= 0; i--)
    {
        // verificare distanta
        if (nava.rachete[i].distanta > distantaRacheta * canvas.clientWidth)
        {
            nava.rachete.splice(i, 1);
            continue;
        }

        nava.rachete[i].x += nava.rachete[i].xv;
        nava.rachete[i].y += nava.rachete[i].yv;
        // calculam distanta parcursa

        nava.rachete[i].distanta += Math.sqrt(Math.pow(nava.rachete[i].xv, 2) +  Math.pow(nava.rachete[i].yv, 2));

        // trecere ecran
        if (nava.rachete[i].x < 0)
        {
            nava.rachete[i].x = canvas.clientWidth;
        }

        else if (nava.rachete[i].x > canvas.clientWidth)
        {
            nava.rachete[i].x = 0
        }

        if (nava.rachete[i].y < 0)
        {
            nava.rachete[i].y = canvas.clientHeight;
        }

        else if (nava.rachete[i].y > canvas.clientHeight)
        {
            nava.rachete[i].y = 0
        }
    }

    // nava spatiala (triunghi)
    if (!inExplozie)
    {

    if (ap && !nava.moarta)
    {
        desenareNava(nava.x, nava.y, nava.d);
    }

    // desenam rachetele
    for ( var i = 0 ; i<nava.rachete.length ; i++)
    {
        context.fillStyle = "red";
        context.beginPath();
        context.arc(nava.rachete[i].x, nava.rachete[i].y, dimensiune_Nava / 15, 0, Math.PI * 2, false);
        context.fill();
    }
    

    // colision rachete - asteroid
    var ax, ay, ar, rx, ry ;
    for (var i = ast.length - 1; i >= 0; i--)
    {
        
        // proprietatile asteroizi
        ax = ast[i].x;
        ay = ast[i].y;
        ar = ast[i].d;
        
 
       
        for (var j = nava.rachete.length - 1 ; j >= 0; j--)
        {
           
            // prop rachete
            rx = nava.rachete[j].x;
            ry = nava.rachete[j].y;
            
            // detectam coliziunea
            if (distantaAN(ax, ay, rx, ry) < ar)
            {
                
                nava.rachete.splice(j, 1);
                numarator++;
                ast.esteLovit = true;
                console.log(ast.esteLovit);
                if (numarator === ast[i].intervalAsteroi)
                {
                    distrugereAsteroid(i);
                    numarator = 0;
                    ast.esteLovit = false;
                    console.log( ast.esteLovit);
                    switch(intervalAsteroid)
                    {
                        case 1:  
                            scor+=10;
                            break;
    
                        case 2: 
                            scor+=25;
                            break;
    
                        case 3: 
                            scor+=50;
                            break;

                        case 4: 
                            scor+=100;
                            break;
       
                    }
                    
                }
                
                break;
            }
            
        }
    }
   
    
    if (nava.nrAparitii > 0)
    {
        nava.aparitie--;
        if (nava.aparitie == 0)
        {
            nava.aparitie = Math.ceil(durataAparitie * cadrePeSecunda);
            nava.nrAparitii --;
        }
        
    }

}

    else
    {
        // desenam explozia
        context.fillStyle = "darkred";
        context.beginPath();
        context.arc(nava.x, nava.y, nava.r * 1.7, 0,  Math.PI * 2, false);
        context.fill();
        context.fillStyle = "red";
        context.beginPath();
        context.arc(nava.x, nava.y, nava.r * 1.4, 0,  Math.PI * 2, false);
        context.fill();

        context.fillStyle = "orange";
        context.beginPath();
        context.arc(nava.x, nava.y, nava.r * 1.1, 0,  Math.PI * 2, false);
        context.fill();
   
        context.fillStyle = "yellow";
        context.beginPath();
        context.arc(nava.x, nava.y, nava.r * 0.8, 0,  Math.PI * 2, false);
        context.fill();

        context.fillStyle = "white";
        context.beginPath();
        context.arc(nava.x, nava.y, nava.r * 0.5, 0,  Math.PI * 2, false);
        context.fill();

    }

    if (show_collision_circle)
    {
        context.strokeStyle = "lime";
        context.beginPath();
        context.arc(nava.x, nava.y, nava.r, 0,  Math.PI * 2, false);
        context.stroke();
    }
    context.font = "30px Comic Sans MS"
    context.fillStyle="white";
    context.fillText(scor, 750, 30);

    // cel mai mare scor
    context.font = "25px Comic Sans MS"
    context.textAlign ="center";
    context.textBaseline = "middle";
    context.fillStyle="white";
    context.fillText("Scor Maxim " + scorMaxim, canvas.clientWidth / 2, dimensiune_Nava);
    // desenare asteroizi
    

    var x, y, d, u, vert, offs, eLovit;
    for ( var i  = 0; i < ast.length; i++)
    {
        
       
        context.lineWidth = dimensiune_Nava / 20;
        // proprietatile asteroidului
        x = ast[i].x;
        y = ast[i].y;
        d = ast[i].d;
        u = ast[i].u;
        vert = ast[i].vert;
        offs = ast[i].offs;
        eLovit = ast[i].esteLovit;
        
        // desenam asteroidul (poligon)
        
        if (intervalAsteroid === 1)
        {
            context.strokeStyle = "green";
        }
        if (intervalAsteroid === 2)
        {
            context.strokeStyle = "yellow";
            if (numarator === 1 && eLovit == true)
            {
                context.strokeStyle = "green";
            }
        }
        if (intervalAsteroid === 3)
        {
            context.strokeStyle = "orange";
            if (numarator === 1 && eLovit == true)
            {
                context.strokeStyle = "yellow";
            }

            else if (numarator === 2 && eLovit == true)
            {
                context.strokeStyle = "green";
            }
        
        }
        if (intervalAsteroid === 4)
        {
            context.strokeStyle = "red";
            if (numarator === 1 && eLovit == true)
            {
                context.strokeStyle = "orange";
            }

            else if (numarator === 2 && eLovit == true)
            {
                context.strokeStyle = "yellow";
            }

            else if (numarator === 3 && eLovit == true)
            {
                context.strokeStyle = "green";
            }
            
        }

        context.beginPath();
        context.moveTo(
            x + d * offs[0] * Math.cos(u),
            y + d * offs[0] * Math.sin(u)
        );
        
        for (var j = 1; j < vert; j++)
        {
           

            context.lineTo(
                x + d * offs[j] * Math.cos(u + j * Math.PI * 2 / vert) ,
                y + d * offs[j] * Math.sin(u + j * Math.PI * 2 / vert)
            );
           

            
        }

        context.closePath();
        context.stroke();

        if (show_collision_circle)
        {
            context.strokeStyle = "lime";
            context.beginPath();
            context.arc(x, y, d, 0,  Math.PI * 2, false);
            context.stroke();
        }


       
    }

  

    // colision
    if (!inExplozie){

    if (nava.nrAparitii == 0 && !nava.moarta)
    {
        for (var i = 0; i < ast.length; i++)
        {
            if (distantaAN(nava.x, nava.y, ast[i].x, ast[i].y) < nava.r + ast[i].d)
                {
                    explozieNava();
                }

               
        }


    }

   
    
    // rotire nava
    nava.d += nava.rot;

    // mutare nava
    nava.x += nava.miscare.x;
    nava.y += nava.miscare.y;
}
else
{
    nava.explozie--;

    if (nava.explozie == 0)
    {
        vietiCurente--;
        if (vietiCurente ==0)
        {
            gameOver();
        }
       else {nava = newNava();}
    }
}
    // trecere ecran 

    if (nava.x < 0 - nava.r)
    {
        nava.x = canvas.clientWidth + nava.r;
    }

    else if (nava.x > canvas.clientWidth + nava.r)
    {
        nava.x = 0- nava.r;
    }

    if (nava.y < 0 - nava.r)
    {
        nava.y = canvas.clientHeight + nava.r;
    }

    else if (nava.y > canvas.clientHeight + nava.r)
    {
        nava.y = 0- nava.r;
    }
    for (var i = 0; i < ast.length; i++)
    {
         // miscare asteroid
         ast[i].x +=ast[i].xv;
         ast[i].y +=ast[i].yv;
 
 
         // trecere ecran
 
         if (ast[i].x < 0 - ast[i].d)
         {
             ast[i].x = canvas.clientWidth + ast[i].d;
         }
         else if (ast[i].x > canvas.clientWidth + ast[i].d)
         {
             ast[i].x = 0 - ast[i].d;
         }
         
         if (ast[i].y < 0 - ast[i].d)
         {
             ast[i].y = canvas.clientHeight + ast[i].d;
         }
         else if (ast[i].y > canvas.clientHeight + ast[i].d)
         {
             ast[i].y = 0 - ast[i].d;
         }
    }

  
    
    
    if (punct_centru)
    {
        context.fillStyle="red";
        context.fillRect(nava.x - 1, nava.y -1, 2 , 2 );
    }

    // textul

    

    if (transText >= 0)
    {
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "rgba(255,255,255," + transText + ")";
        context.font = "small-caps" + marimeAsteroid + "px dejavu sans mono";
        context.fillText(text, canvas.clientWidth / 2, canvas.clientHeight * 0.75);
        transText -= (1.0 / dispText / cadrePeSecunda);
    }

    else if ( nava.moarta)
    {
        jocNow();
    }
    var culVieti
    for ( var i = 0; i<vietiCurente ; i++)
    {
        culVieti = inExplozie && i == vietiCurente - 1 ? "red" : "white";
        desenareNava(dimensiune_Nava + i * dimensiune_Nava * 1.2, dimensiune_Nava, 0.5 * Math.PI, culVieti);
    }
   

}