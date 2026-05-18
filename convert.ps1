Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Image]::FromFile("$PSScriptRoot\assets\icons\partners\wecon.bmp")
$bmp.Save("$PSScriptRoot\assets\icons\partners\wecon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Host "Converted wecon.bmp to wecon.png"
