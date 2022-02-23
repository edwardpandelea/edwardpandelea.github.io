
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



