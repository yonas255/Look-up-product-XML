<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes"/>
  
  <xsl:template match="/">
    <html>
     
      <body>
        <h2>Products</h2>
        <div class="product-grid">
          <xsl:for-each select="Products/Product">
            <div class="product">
              <h3><xsl:value-of select="Description/Name" /></h3>
              <p><xsl:value-of select="Description/DescriptionText" /></p>
			  <p><xsl:text>Quantity:</xsl:text><xsl:value-of select="Description/Quantity" /></p>
              <p><xsl:text>€</xsl:text><xsl:value-of select="Description/UnitPrice" /></p>
			   <img>
                <xsl:attribute name="src">
                  <xsl:value-of select="Description/Image" />
                </xsl:attribute>
              </img>
              <button>Add to Cart</button>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
