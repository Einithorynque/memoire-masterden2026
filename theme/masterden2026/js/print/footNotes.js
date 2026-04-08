// Script that 
// - gather markdown generated footnotes calls 
// - for each call, gather the target footnote (at the end of the <main>) :
//   - deletes the back reference to note call
//   - create an inline <span class="footnote"> 
//   - insert the content of the note within the <span>
//   - inject the <span> after the call
//   - then, deletes the call
// Author: ? 

class MyHandler extends Paged.Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
    }

    beforeParsed(content) { //-> avant de transformer le body en page
        // 1. Transformer les [@clé] partout dans le contenu (corps + notes)
        this._replaceCitationMarkers(content);

        // 2. Traiter les notes de bas de page inline
        const footnote_calls = content.querySelectorAll(".footnote-ref");
        footnote_calls.forEach((call) => {
            const note = content.querySelector(
                call.querySelector("a").getAttribute("href")
            );
            const backref = note.querySelector(".footnote-backref");
            backref.parentElement.removeChild(backref);

            const inline_note = document.createElement("span");
            inline_note.className = "footnote";
            inline_note.innerHTML = note.querySelector("p").innerHTML;
            call.after(inline_note);
            call.parentElement.removeChild(call);
        });

        // 3. Générer la bibliographie dans #biblio (ou à la fin de #main)
        CitationManager.renderBibliography(content.querySelector("#main") || content);
    }

    /**
     * Parcourt tous les contenus texte brut du DOM et remplace [@clé] / [@@clé]
     * par un <span class="citation-text"> avec la citation formatée.
     */
    _replaceCitationMarkers(root) {
        const regex = /\[@@?([a-zA-Z0-9_:\-]+)\]/g;
        const walker = document.createTreeWalker( //créer un tree walker
            root,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const nodesToReplace = [];
        let node;
        while ((node = walker.nextNode())) { //collecte tous les contenus brut
            if (regex.test(node.nodeValue)) {
                nodesToReplace.push(node);
            }
            regex.lastIndex = 0; // reset après chaque test
        }

        //une fois que l'on a tout collecté, on remplace par un document fragment les @clés
        nodesToReplace.forEach((textNode) => { 
            const frag = this._buildReplacementFragment(textNode.nodeValue, regex);
            textNode.parentNode.replaceChild(frag, textNode);
        });
    }

    /**
     Construit un DocumentFragment en découpant les textes : après avoir cherché les [@clé],
     le script vient segmenter le bloc en récupérant le texte avant le [@clé] et le texte après, 
     voire le texte entre deux références. 
     */
    _buildReplacementFragment(text, regex) {  
        const frag = document.createDocumentFragment();
        let lastIndex = 0;
        regex.lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
            // Texte brut avant le marqueur [@]
            if (match.index > lastIndex) { //matchindex donne la position du début du [@]
                frag.appendChild(
                    document.createTextNode(text.slice(lastIndex, match.index))
                );
            }

            const key = match[1];
            const entries = CitationManager.getEntries();
            const span = document.createElement("span");
            //span de citation
            if (entries[key]) {
                span.className = "citation-text";
                span.dataset.key = key;
                span.innerHTML = CitationManager.formatInlineCitation(key);// si onveut une citation complète
                // span.textContent = CitationManager.formatInlineCitation(key); // si on veut du auteur-date
            } else {
                console.warn(`[MyHandler] Clé de citation inconnue : "${key}"`);
                span.className = "citation-unknown";
                span.title = "Référence introuvable";
                span.textContent = `[?${key}]`;
            }
            
            frag.appendChild(span);
            lastIndex = regex.lastIndex;
        }

        // Texte brut restant après le dernier marqueur [@]
        if (lastIndex < text.length) { //lastindex donne la position après [@]
            frag.appendChild(document.createTextNode(text.slice(lastIndex)));
        }

        return frag;
    }
}

Paged.registerHandlers(MyHandler);