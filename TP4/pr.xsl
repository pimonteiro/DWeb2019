<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="xhtml" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="pr">
        <html>
            <head>
                <title>Project Record</title>
                <meta charset="UTF-8"/>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/> 
            </head>
            <body>
                <h1>Project Record</h1>
                <xsl:apply-templates/>
                <xsl:value-of  select="current-date()"/>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="metadata">
        <hr/>
        <table class="w3-table w3-striped">
            <tr>
                <td><b>KEY NAME</b></td>
                <td><xsl:value-of select="./keyname"/></td>
                <td><b>BEGIN DATE</b></td>
                <td><xsl:value-of select="./bdate"/></td>
            </tr>
            <tr>
                <td><b>TITLE</b></td>
                <td><xsl:value-of select="./title"/></td>
                <td><b>END DATE</b></td>
                <td><xsl:value-of select="./edate"/></td>
            </tr>
            <tr>
                <td><b>SUBTITLE</b></td>
                <td><xsl:value-of select="./subtitle"/></td>
                <td><b>SUPERVISOR</b></td>
                <td>
                    <a>
                        <xsl:attribute name="href">
                            <xsl:value-of select="./supervisor/@homepage"/>
                        </xsl:attribute>
                    <xsl:value-of select="./supervisor"/>
                    </a>
                </td>
            </tr>            
        </table>
        <hr/>
        <hr/>
    </xsl:template>
    <xsl:template match="workteam">
        <h3>WorkTeam:</h3>
        <ol>
        <xsl:for-each select="./worker">
            <li>
                <xsl:value-of select="./name"/> - <xsl:value-of select="./email"/> - 
                <a>
                    <xsl:attribute name="href">
                        <xsl:value-of select="./git"/>   
                    </xsl:attribute>
                    GIT
                </a>
            </li>
        </xsl:for-each>
        </ol>
        <hr/>
        <hr/>
    </xsl:template>
    <xsl:template match="abstract">
        <xsl:apply-templates/>
        <hr/>
        <hr/>
    </xsl:template>
    <xsl:template match="deliverables">
        <h3>Derivables:</h3>
        <ul>
            <xsl:for-each select="./deliverable">
                <li>
                    <a>
                        <xsl:attribute name="href">
                            <xsl:value-of select="./@path"/>
                        </xsl:attribute>
                        <xsl:value-of select="."/>
                    </a>
                </li>
            </xsl:for-each>
        </ul>
        <hr/>
    </xsl:template>
    <xsl:template match="p">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    <xsl:template match="i">
        <i>
            <xsl:value-of select="."/>
        </i>
    </xsl:template>
    <xsl:template match="u">
        <u>
            <xsl:value-of select="."/>
        </u>
    </xsl:template>
    <xsl:template match="b">
        <b>
            <xsl:value-of select="."/>
        </b>
    </xsl:template>
    
</xsl:stylesheet>