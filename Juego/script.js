document.addEventListener('DOMContentLoaded', function() {
    const puzzle = document.getElementById('puzzle');
    const pieces = [];
    const size = 4;
    const imgSrc = 'pinguino.jpg';

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const piece = document.createElement('div');
            piece.classList.add('piece');
            piece.style.backgroundImage = `url(${imgSrc})`;
            piece.style.backgroundPosition = `-${j * 100}px -${i * 100}px`;
            piece.setAttribute('data-position', `${i}-${j}`);
            piece.draggable = true;
            piece.addEventListener('dragstart', dragStart);
            piece.addEventListener('dragover', dragOver);
            piece.addEventListener('drop', drop);
            puzzle.appendChild(piece);
            pieces.push(piece);
        }
    }

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.position);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const draggedPos = e.dataTransfer.getData('text/plain');
        const targetPos = e.target.dataset.position;

        const draggedPiece = pieces.find(piece => piece.dataset.position === draggedPos);
        const targetPiece = pieces.find(piece => piece.dataset.position === targetPos);

        if (draggedPiece && targetPiece) {
            const draggedStyle = draggedPiece.style.cssText;
            draggedPiece.style.cssText = targetPiece.style.cssText;
            targetPiece.style.cssText = draggedStyle;
        }
    }

    window.shuffle = function() {
        pieces.forEach(piece => {
            const randomIndex = Math.floor(Math.random() * pieces.length);
            const randomPiece = pieces[randomIndex];
            const tempStyle = piece.style.cssText;
            piece.style.cssText = randomPiece.style.cssText;
            randomPiece.style.cssText = tempStyle;
        });
    };
});
