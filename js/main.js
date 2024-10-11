function loadXMLDoc(dname, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", dname, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                callback(this.responseXML); // Call the callback function with the response
            } else {
                console.error("Error loading " + dname + ": " + this.status);
            }
        }
    };
    xhttp.send();
}

function displayResult() {
    loadXMLDoc("product.xml", function(xml) {
        if (!xml) {
            console.error("Error loading XML");
            return;
        }

        loadXMLDoc("style.xsl", function(xsl) {
            if (!xsl) {
                console.error("Error loading XSL");
                return;
            }

            // Check if the browser is IE or Edge
            if (window.ActiveXObject || xsl && xsl.xml) {
                let ex = xml.transformNode(xsl);
                document.getElementById("productCatalog").innerHTML = ex;
            } 
            // For modern browsers
            else if (document.implementation && document.implementation.createDocument) {
                let xsltProcessor = new XSLTProcessor();
                xsltProcessor.importStylesheet(xsl);
                let resultDocument = xsltProcessor.transformToFragment(xml, document);
                
                console.log(resultDocument);

                if (resultDocument) {
                    document.getElementById("productCatalog").innerHTML = ""; // Clear existing content
                    document.getElementById("productCatalog").appendChild(resultDocument);
                } else {
                    console.error("Error: resultDocument is null or undefined.");
                }
            } else {
                console.error("Browser does not support XSLT.");
            }
        });
    });
}

// Ensure you call displayResult on page load
window.onload = displayResult;


		
 
 var message = "Good Afternoon Wellcome to my Web Page";
i=0;
function scrollBox() {
	i++;
	if(i > message.length) {
	    i = 1;
	}
	document.forms[0].elements[0].value = message.substring(0,i)+"_";
	setTimeout("scrollBox()",130);
}//end function scrollBox


    function lookupProduct() {
        // Get the user input (product ID or Name)
        var searchInput = document.getElementById('productId').value;
        // Check if the search input is empty
        if (searchInput === '') {
            // Display an error message if the input is empty
            document.getElementById('result').innerText = 'Please enter a product ID or Name.';
            return;
        }
        // Create a new XMLHttpRequest object for making an asynchronous request,its means that the request does not block the execution of other scripts while waiting for the server's response.
        var xhttp = new XMLHttpRequest();

        // set to a function that checks if the request is completed (readyState == 4) and if the response status is OK (status == 200).
        xhttp.onreadystatechange = function() {
            // Check if the request is complete and successful
            if (this.readyState == 4 && this.status == 200) {
                // Parse the XML response
                var xmlDoc = this.responseXML;

                // Use XPath to select product nodes based on the search input (ID or Name)
                var product = xmlDoc.evaluate(
                    "//Product[contains(Description/Name, '" + searchInput + "') or @Code='" + searchInput + "']",
                    xmlDoc,
                    null,
                    XPathResult.ANY_TYPE,
                    null
                );

                // Get the first matching product node
                var productNode = product.iterateNext();

                // Check if a matching product is found
                if (productNode) {
                    // Extract product information from the XML
                    var category = productNode.getElementsByTagName("Category")[0].textContent;
                    var name = productNode.getElementsByTagName("Name")[0].textContent;
                    var description = productNode.getElementsByTagName("DescriptionText")[0].textContent;
                    var quantityValue = productNode.getElementsByTagName("Quantity")[0].textContent;
                    var unitPrice = productNode.getElementsByTagName("UnitPrice")[0].textContent;
                    var image = productNode.getElementsByTagName("Image")[0].textContent;

                    // Get the result container element
                    var result = document.getElementById('result');

                    // Create HTML elements to display product information
                    var productInfo = document.createElement('div');
                    productInfo.classList.add('product');

                    var title = document.createElement('h3');
                    title.textContent = name;

                    var descriptionInfo = document.createElement('p');
                    descriptionInfo.textContent = description;

                    var quantity = document.createElement('p');
                    quantity.textContent = "Quantity:" + quantityValue;

                    var priceInfo = document.createElement('p');
                    priceInfo.innerHTML = `<strong>Unit Price:</strong> &euro; ${unitPrice}`;

                    var img = document.createElement('img');
                    img.src = image;

                    // Append created elements to the result container
                    productInfo.appendChild(title);
                    productInfo.appendChild(descriptionInfo);
                    productInfo.appendChild(quantity);
                    productInfo.appendChild(priceInfo);
                    productInfo.appendChild(img);

                    result.innerHTML = "";  // Clear previous results
                    result.appendChild(productInfo);  // Display product information
                } else {
                    // Display a message if no matching product is found
                    document.getElementById('result').innerText = "Product not found.";
                }
            }
        };

        // Open the asynchronous GET request to the XML file containing product data
        xhttp.open("GET", "product.xml", true);

        // Send the request
        xhttp.send();
    }
	var message = "Good Afternoon Wellcome to Our Shop!";
		i=0;
		function scrollBox() {
			i++;
			if(i > message.length) {
				i = 1;
			}
			document.forms[0].elements[0].value = message.substring(0,i)+"_";
			setTimeout("scrollBox()",130);
		}//end function scrollBox
