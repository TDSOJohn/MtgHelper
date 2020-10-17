//  client_side utilities

//  Sanitizes string_in checking for ints. Warning: 11fxoifS => 11, a11b => NaN
export function intParser(string_in)
{
    const parsed = parseInt(string_in, 10);
    if(isNaN(parsed) && (parsed !== null))
    {
        return 1;
    }
    return parsed;
}

//  Simple utility that returns a query with type specified in "variable"
export function getQueryVariable(variable_in)
{
    var query   = window.location.search.substring(1);
    var vars    = query.split('&');
    for (var i  = 0; i < vars.length; i++)
    {
        var pair= vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable_in)
        {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable_in);
    return 0;
}
