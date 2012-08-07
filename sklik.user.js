// ==UserScript==
// @name           Sklik
// @version        1.0.5 beta
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

/**
 * Udělá select daného elementu
 *
 * @param element  Id elementu
 */

addScript('https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {

	function SelectText(element) {
	    var text = document.getElementById(element);
	    if ($.browser.msie) {
	        var range = document.body.createTextRange();
	        range.moveToElementText(text);
	        range.select();
	    } else if ($.browser.mozilla || $.browser.opera) {
	        var selection = window.getSelection();
	        var range = document.createRange();
	        range.selectNodeContents(text);
	        selection.removeAllRanges();
	        selection.addRange(range);
	    } else if ($.browser.safari) {
	        var selection = window.getSelection();
	        selection.setBaseAndExtent(text, 0, text, 1);
	    }
	}

	var kwCointainer = $('.keywords-edit-inner'),
	    tableTitle = $('<table id="export_title"></table>'),
	    table = $('<table id="export"></table>'),
	    row = '<tr><th class="kw">KW</td><th class="searched">hledanost</td><th class="rival">konkurence</td><th class="price">cena</td></tr>',
	    selectButton = '<button id="select_all">vybrat vše</button>';

	kwCointainer.html(''); // vyprazdnění kw cointainerů (levý blok v skliku)
	kwCointainer.append( selectButton ); // vložení tabulky
	kwCointainer.append( tableTitle ); // vložení tabulky
	kwCointainer.append( table ); // vložení tabulky
	tableTitle.append( row ); //vložení řádku do tabulky

	/**
	 * Event při kliku na řádek
	 * 
	 */

	$('.keyRow').live( 'click' , function(){
		var thisRow = $(this);

		if( thisRow.find('td:eq(0)').css('background').match(/keyremove/g) )
		{
	    	row = '<tr><td class="kw">'+ thisRow.find('td:eq(0)').text() +'</td><td class="searched">'+ thisRow.find('td:eq(1)').text() +'</td><td class="rival">'+ thisRow.find('td:eq(3) div div').attr('style').replace("width:","").replace("%;","") +'</td><td  class="price">'+ thisRow.find('td:eq(4)').text() +'</td></tr>';
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


	/**
	 * Event při kliku na "Přidat všechna slova"
	 *
	 */

	$('#suggest-all').live( 'click' , function(){

		$('.keyRow').each(function(){

			var thisRow = $(this);

	    	row = '<tr><td class="kw">'+ thisRow.find('td:eq(0)').text() +'</td><td class="searched">'+ thisRow.find('td:eq(1)').text() +'</td><td class="rival">'+ thisRow.find('td:eq(3) div div').attr('style').replace("width:","").replace("%;","") +'</td><td  class="price">'+ thisRow.find('td:eq(4)').text() +'</td></tr>';
			table.append( row );

		});

	});	 


	/**
	 * Event při kliku na "Vybrat vše"
	 *
	 */
	$('#select_all').live( 'click' , function(){
		SelectText('export');
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

    '.kw {',
    '    width: 248px;',
    '}',

    '.searched {',
    '    width: 73px;',
    '}',

    '.rival {',
    '    width: 85px;',
    '}',

    '.price {',
    '    width: 42px;',
    '}',
  
].join('\n'));