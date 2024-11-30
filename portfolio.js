        // JavaScript for toggling project description visibility
        document.getElementById('DOMContentLoaded',()=>{
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const description = card.querySelector('.project-description');
                description.style.display = (description.style.display === 'block') ? 'none' : 'block';
            });
        });
        //for smooth scroll
function toView(element){
document.querySelector(element).scrollIntoView({ behavior: 'smooth' });}
document.getElementById('year').innerHTML = new Date().getFullYear();

});