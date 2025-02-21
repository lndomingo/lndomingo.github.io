// Filter function for project categories
function filterProjects(category) {
    const projects = document.querySelectorAll('.project');  // Get all project divs
    if (category === 'all') {
        projects.forEach(project => {
            project.style.display = 'block'; // Show all projects
        });
    } else {
        projects.forEach(project => {
            // Check if project has the selected category, and show or hide accordingly
            if (project.getAttribute('data-category').includes(category)) {
                project.style.display = 'block'; // Show project
            } else {
                project.style.display = 'none'; // Hide project
            }
        });
    }
}

//NEW SLIDE
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.slideshow-container').forEach(container => {
        let slides = container.querySelectorAll('.mySlides');
        let index = 0;

        function showSlides() {
            slides.forEach(slide => slide.style.display = 'none');
            index = (index + 1) % slides.length;
            slides[index].style.display = 'block';
        }

        showSlides();
        setInterval(showSlides, 6500);  // Adjust the interval as needed
    });
});


//SCROLL
document.querySelector('nav a[href="#home"]').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', function() {
    // Ensure smooth scrolling works for all anchors
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});


// Blog search
function filterPosts(tag) {
    const posts = document.querySelectorAll('.post');
    const heading = document.getElementById('post-heading');
    heading.textContent = tag + ' Posts';
    posts.forEach(post => {
        const tags = post.getAttribute('data-tags').split(',');
        post.style.display = tags.includes(tag) ? 'block' : 'none';
    });
}

function showAllPosts() {
    const posts = document.querySelectorAll('.post');
    const heading = document.getElementById('post-heading');
    heading.textContent = 'Recent Posts';
    posts.forEach(post => post.style.display = 'block');
}

function searchPosts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const posts = document.querySelectorAll('.post');
    const heading = document.getElementById('post-heading');
    heading.textContent = 'Searched Posts'; // Always display 'Searched Posts' when searching

    posts.forEach(post => {
        const title = post.querySelector('h3');
        const date = post.querySelector('small');
        const content = post.querySelector('p:last-of-type');
        
        const text = `${title.textContent} ${date.textContent} ${content.textContent}`.toLowerCase();
        
        if (text.includes(query)) {
            post.style.display = 'block';
            [title, date, content].forEach(element => {
                element.innerHTML = element.textContent.replace(new RegExp(query, 'gi'), match => `<span class='highlight'>${match}</span>`);
            });
        } else {
            post.style.display = 'none';
            [title, date, content].forEach(element => {
                element.innerHTML = element.textContent;
            });
        }
    });
}

//BLOG page
document.addEventListener("DOMContentLoaded", function () {
    const postsPerPage = 10;
    let currentPage = 1;
    const posts = document.querySelectorAll(".post");
    const totalPages = Math.ceil(posts.length / postsPerPage);
    
    function showPage(page) {
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;
        
        posts.forEach((post, index) => {
            post.style.display = index >= start && index < end ? "block" : "none";
        });

        document.getElementById("prev-btn").style.visibility = page === 1 ? "hidden" : "visible";
        document.getElementById("next-btn").style.visibility = page === totalPages ? "hidden" : "visible";
    }

    document.getElementById("prev-btn").addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    document.getElementById("next-btn").addEventListener("click", function () {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });

    showPage(currentPage);
});
