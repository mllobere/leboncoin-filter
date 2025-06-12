// Function to initialize the extension UI
function initializeUI() {
    try {
        // Création du bouton principal
        var executeButton = document.createElement('button');
        executeButton.id = 'executeButton';
        executeButton.textContent = 'Filtrer';
        executeButton.classList.add('main-button');
        executeButton.style.position = 'fixed';
        executeButton.style.bottom = '20px';
        executeButton.style.right = '60px';
        executeButton.style.zIndex = 1000;
        executeButton.style.borderRadius = '16px';
        executeButton.style.padding = '7px';
        executeButton.style.backgroundColor = '#ec5a13';
        executeButton.style.color = 'white';
        executeButton.style.fontSize = 'larger';

        document.body.appendChild(executeButton);

        // Création du bouton pour ouvrir la liste des checkboxes
        var dropdownButton = document.createElement('button');
        dropdownButton.id = 'dropdownButton';
        dropdownButton.innerHTML = '<i class="fas fa-chevron-down">▲</i>';
        dropdownButton.style.borderRadius = '16px';
        dropdownButton.style.padding = '7px';
        dropdownButton.style.backgroundColor = '#ec5a13';
        dropdownButton.style.color = 'white';
        dropdownButton.style.fontSize = 'larger';
        dropdownButton.style.position = 'fixed';
        dropdownButton.style.right = '20px';
        dropdownButton.style.bottom = '20px';
        dropdownButton.classList.add('dropdown-button');
        dropdownButton.style.zIndex=10000;
        document.body.appendChild(dropdownButton);

        // Création de la liste de cases à cocher
        var options = ["Vendu", "Achat en cours", "Livraison possible"];
        var checkboxContainer = document.createElement('div');
        checkboxContainer.id = 'checkboxContainer';
        options.forEach(function(option) {
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = option;
            checkbox.checked = true;
            checkbox.classList.add('filter-checkbox');
            var label = document.createElement('label');
            label.textContent = option;
            label.appendChild(checkbox);
            checkboxContainer.appendChild(label);
        });

        // Ajout du bouton principal et du bouton de liste de cases à cocher à la page
        document.body.appendChild(checkboxContainer);

        // Cacher la liste de cases à cocher initialement
        checkboxContainer.style.display = 'none';

        // Définir le style pour la liste de cases à cocher
        checkboxContainer.style.position = 'fixed';
        checkboxContainer.style.bottom = 'calc(40px + 20px)';
        checkboxContainer.style.right = '20px';
        checkboxContainer.style.backgroundColor = '#fff';
        checkboxContainer.style.border = '1px solid #ccc';
        checkboxContainer.style.padding = '10px';
        checkboxContainer.style.borderRadius = '4px';
        checkboxContainer.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        checkboxContainer.style.zIndex = 10000;

        // Fonction pour basculer l'affichage de la liste de cases à cocher
        dropdownButton.addEventListener('click', function() {
            if (checkboxContainer.style.display === 'none') {
                checkboxContainer.style.display = 'flex';
                checkboxContainer.style.flexDirection = 'column';
                dropdownButton.innerHTML = '<i class="fas fa-chevron-down">▲</i>';
            } else {
                checkboxContainer.style.display = 'none';
                dropdownButton.innerHTML = '<i class="fas fa-chevron-up">▼</i>';
            }
        });

        // Ajout d'un écouteur d'événements pour exécuter le script lorsque le bouton principal est cliqué
        executeButton.addEventListener('click', function() {
            var selectedOptions = getSelectedOptions();
            filterElements(selectedOptions);
        });
    } catch (error) {
        console.error('Error initializing UI:', error);
    }
}

// Fonction pour obtenir les options sélectionnées
function getSelectedOptions() {
    try {
        var selectedOptions = [];
        var checkboxes = document.querySelectorAll('.filter-checkbox');
        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                selectedOptions.push(checkbox.value);
            }
        });
        return selectedOptions;
    } catch (error) {
        console.error('Error getting selected options:', error);
        return [];
    }
}

// Fonction pour filtrer les éléments en fonction des options sélectionnées
function filterElements(selectedOptions) {
    try {
        var tags = document.querySelectorAll('[data-spark-component="tag"]');
        if (tags.length === 0) {
            console.log('No tags found with data-spark-component="tag"');
        }
        
        tags.forEach(function(tag) {
            var tagText = tag.innerText.trim();
            var adCard = tag.closest('.styles_adCard__JzKik');
            if (selectedOptions.includes(tagText)) {
                if (adCard) {
                    adCard.classList.remove('hidden');
                }
            } else {
                if (adCard) {
                    adCard.classList.add('hidden');
                }
            }
        });
    } catch (error) {
        console.error('Error filtering elements:', error);
    }
}

// Initialize the UI when the document is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeUI);
} else {
    initializeUI();
}


