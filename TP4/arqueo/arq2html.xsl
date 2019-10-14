<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    
    version="1.0">
    
    <xsl:output method="html" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="ARQELEM">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                    <meta charset="UTF-8"/>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/> 
                </head>
                <body>
                    <h1><xsl:value-of select="IDENTI"/></h1>
                    <table class="w3-table w3-striped">
                        <tr>
                            <td>Tipo</td>
                            <td><xsl:value-of select="TIPO/@ASSUNTO"/></td>
                        </tr>
                        <tr>
                            <td>Descrição</td>
                            <td><xsl:value-of select="DESCRI"/></td>
                        </tr>
                        <tr>
                            <td>Lugar</td>
                            <td><xsl:value-of select="LUGAR"/></td>
                        </tr>
                        <tr>
                            <td>Freguesia</td>
                            <td><xsl:value-of select="FREGUE"/></td>
                        </tr>
                        <tr>
                            <td>Concelho</td>
                            <td><xsl:value-of select="CONCEL"/></td>
                        </tr>
                        <tr>
                            <td>CODADM</td>
                            <td><xsl:value-of select="CODADM"/></td>
                        </tr>
                        <tr>
                            <td>Latitude</td>
                            <td><xsl:value-of select="LATITU"/></td>
                        </tr>
                        <tr>
                            <td>Longitude</td>
                            <td><xsl:value-of select="LONGIT"/></td>
                        </tr>
                        <tr>
                            <td>Altitude</td>
                            <td><xsl:value-of select="ALTITU"/></td>
                        </tr>
                    </table>
                    <hr/>
                    <hr/>
                    <xsl:if test="QUADRO">
                        <h3>Quadro:</h3>
                        <xsl:value-of select="QUADRO"/>
                        <hr/>
                    </xsl:if>   
                    <xsl:for-each select="DESARQ">
                        <h3>Descrição do Arquiossítio:</h3>
                        <xsl:apply-templates/>
                    </xsl:for-each>
                    <hr/>
                    <xsl:for-each select="ACESSO">
                        <h2>Acesso: </h2>
                        <p><xsl:value-of select="."/></p>
                    </xsl:for-each>
                    <hr/>
                    <xsl:if test="DEPOSI">
                        <h3>Depositado em:</h3>
                        <ul>
                            <li>
                                <xsl:value-of select="DEPOSI"/>
                            </li>
                        </ul>
                        <hr/>
                    </xsl:if>  
                    <xsl:if test="INTERE">
                        <h3>Intere:</h3>
                        <p><xsl:value-of select="INTERE"/></p>
                        <hr/>
                    </xsl:if>      
                    <xsl:if test="INTERP">
                        <h3>Interpretação:</h3>
                        <p><xsl:value-of select="INTERP"/></p>
                        <hr/>
                    </xsl:if>  
                    <h3>Bibliografia:</h3>
                    <ul>
                        <xsl:for-each select="BIBLIO">
                            <li>
                                <xsl:value-of select="."/>
                            </li>
                        </xsl:for-each>
                    </ul>
                    <h3>Autores:</h3>
                    <ul>
                        <xsl:for-each select="AUTOR">
                            <li>
                                <xsl:value-of select="."/>
                            </li>
                        </xsl:for-each>
                    </ul>
                    <p>Data: <xsl:value-of select="DATA"/></p>
                    
                    <address>
                        <a href="../index.html">Voltar à página principal</a>
                    </address>
                </body>
            </html>
        
    </xsl:template>
    <xsl:template match="LIGA">
        <b>
            <xsl:value-of select="."/>
        </b>
    </xsl:template>
</xsl:stylesheet>