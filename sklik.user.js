// ==UserScript==
// @name           Sklik
// @version        1.0.0
// @include        https://www.sklik.cz/navrh-klicovych-slov
// @author         Jan Matoušek
// @run-at         document-end
// ==/UserScript==

/**
 * Přidá skript do hlavičky
 *
 * @param src      Cesta ke skriptu
 * @param callback Funkce, která se provede po načtení skriptu
 *
 * @author 800XE
 */
function addScript(src, callback) {
    var element = document.createElement('script');
    element.setAttribute('src', src);
    element.addEventListener('load', function() {
        var element = document.createElement('script');
        element.textContent = '(' + callback.toString() + ')();';
        document.body.appendChild(element);
    }, false);
    document.body.appendChild(element);
}

/**
 * Vytvoří tag style se styly a přidá ho do hlavičky
 *
 * @param styles Řetězec se styly
 *
 * @author 800XE
 */
function addStyles(styles) {
    var element = document.createElement('style');
    element.type = 'text/css';
    var content = document.createTextNode('' + styles + '')
    element.appendChild(content);
    document.body.appendChild(element);
}


addScript('https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
	var kwCointainer = $('.keywords-edit-inner'),
	    table = $('<table></table>'),
	    row = '<tr><th>KW</td><th>hledanost</td><th>konkurence</td><th>cena</td></tr>';

	kwCointainer.html(''); // vyprazdnění kw cointainerů (levý blok v skliku)
	kwCointainer.append( table ); // cložení tabulky
	table.append( row ); //vložení řádku do tabulky

	/**
	 * Event při kliku na řádek
	 * 
	 */

	$('.keyRow').live( 'click' , function(){
		var thisRow = $(this);

		if( thisRow.find('td:eq(0)').css('background').match(/keyremove/g) )
		{
	    	row = '<tr><td>'+ thisRow.find('td:eq(0)').text() +'</td><td>'+ thisRow.find('td:eq(1)').text() +'</td><td>'+ thisRow.find('td:eq(3) div div').attr('style').replace("width:","").replace("%;","") +'</td><td>'+ thisRow.find('td:eq(4)').text() +'</td></tr>';
			table.append( row );
		} 
		else 
		{
			kwCointainer.find('tr').each(function(){
				if( $(this).find('td:eq(0)').text() == thisRow.find('td:eq(0)').text()){
					$(this).remove();
				} 
			});
		}

	});

});


// Styly
addStyles([

    '.keywords-edit-inner table {',
    '    border-collapse: collapse;',    
    '}',
  
    '.keywords-edit-inner table td,',
    '.keywords-edit-inner table th {',
    '    border: 1px solid black;',
    '    padding: 5px;',  
    '}',
  
].join('\n'));