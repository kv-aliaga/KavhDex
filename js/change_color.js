// event listener
document.querySelectorAll('input[name="theme"]').forEach(r => {
    r.addEventListener('change', () => {
        const selected = document.querySelector('input[name="theme"]:checked').value
        applyTheme(selected)
    })
})

// function that changes :root variables according to the color selected
function applyTheme(selected){
    if (selected === 'purple'){
    document.documentElement.style.setProperty('--primary-green', '#a020f0')
    document.documentElement.style.setProperty('--text-hover', '#d36bff')
    }
    if (selected === 'red'){
        document.documentElement.style.setProperty('--primary-green', '#ff1e1e')
        document.documentElement.style.setProperty('--text-hover', '#ff6b6b')
    }
    if (selected === 'blue'){
        document.documentElement.style.setProperty('--primary-green', '#0077ff')
        document.documentElement.style.setProperty('--text-hover', '#66b3ff')
    }
    if (selected === 'yellow'){
        document.documentElement.style.setProperty('--primary-green', '#ffd500')
        document.documentElement.style.setProperty('--text-hover', '#fff066')
    }
    if (selected === 'green'){
        document.documentElement.style.setProperty('--primary-green', '#b4dd1e')
        document.documentElement.style.setProperty('--text-hover', '#d4ff4a')
    }
}