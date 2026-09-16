$csvPath = "cash_contributors.csv"
$data = Import-Csv -Path $csvPath

$list = [System.Collections.Generic.List[PSCustomObject]]::new()
$id = 1
$totalAmount = 0

foreach ($row in $data) {
    $amt = 0
    if ([double]::TryParse($row.Amount, [ref]$amt)) {
        $totalAmount += $amt
    }
    $item = [PSCustomObject]@{
        id = $id
        section = $row.Section.Trim()
        name = $row.Name.Trim()
        amount = $amt
    }
    $list.Add($item)
    $id++
}

if (-not (Test-Path "src\data")) {
    New-Item -ItemType Directory -Path "src\data" | Out-Null
}

$json = $list | ConvertTo-Json -Depth 5
[System.IO.File]::WriteAllText((Join-Path (Get-Location) "src\data\cashContributors.json"), $json, [System.Text.Encoding]::UTF8)

Write-Host "Success: Converted $($list.Count) records. Total Sum: Rs $totalAmount"
