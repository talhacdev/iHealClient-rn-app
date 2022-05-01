const codes = [
  // {
  //     cca2: 'AF',
  //     name: 'Afghanistan',
  //     code: '+93'
  // },
  // {
  //     cca2: 'AL',
  //     name: 'Albania',
  //     code: '+355'
  // },
  // {
  //     cca2: 'DZ',
  //     name: 'Algeria',
  //     code: '+213'
  // },
  // {
  //     cca2: 'AS',
  //     name: 'American Samoa',
  //     code: '+1684'
  // },
  // {
  //     cca2: 'AD',
  //     name: 'Andorra',
  //     code: '+376'
  // },
  // {
  //     cca2: 'AO',
  //     name: 'Angola',
  //     code: '+244'
  // },
  // {
  //     cca2: 'AI',
  //     name: 'Anguilla',
  //     code: '+1264'
  // },
  // {
  //     cca2: 'AQ',
  //     name: 'Antarctica',
  //     code: '+672'
  // },
  // {
  //     cca2: 'AG',
  //     name: 'Antigua and Barbuda',
  //     code: '+1268'
  // },
  // {
  //     cca2: 'AR',
  //     name: 'Argentina',
  //     code: '+54'
  // },
  // {
  //     cca2: 'AM',
  //     name: 'Armenia',
  //     code: '+374'
  // },
  // {
  //     cca2: 'AW',
  //     name: 'Aruba',
  //     code: '+297'
  // },
  // {
  //     cca2: 'AU',
  //     name: 'Australia',
  //     code: '+61'
  // },
  // {
  //     cca2: 'AT',
  //     name: 'Austria',
  //     code: '+43'
  // },
  // {
  //     cca2: 'AZ',
  //     name: 'Azerbaijan',
  //     code: '+994'
  // },
  // {
  //     cca2: 'BS',
  //     name: 'Bahamas',
  //     code: '+1242'
  // },
  // {
  //     cca2: 'BH',
  //     name: 'Bahrain',
  //     code: '+973'
  // },
  // {
  //     cca2: 'BD',
  //     name: 'Bangladesh',
  //     code: '+880'
  // },
  // {
  //     cca2: 'BB',
  //     name: 'Barbados',
  //     code: '+1246'
  // },
  // {
  //     cca2: 'BY',
  //     name: 'Belarus',
  //     code: '+375'
  // },
  // {
  //     cca2: 'BE',
  //     name: 'Belgium',
  //     code: '+32'
  // },
  // {
  //     cca2: 'BZ',
  //     name: 'Belize',
  //     code: '+501'
  // },
  // {
  //     cca2: 'BJ',
  //     name: 'Benin',
  //     code: '+229'
  // },
  // {
  //     cca2: 'BM',
  //     name: 'Bermuda',
  //     code: '+1441'
  // },
  // {
  //     cca2: 'BT',
  //     name: 'Bhutan',
  //     code: '+975'
  // },
  // {
  //     cca2: 'BO',
  //     name: 'Bolivia',
  //     code: '+591'
  // },
  // {
  //     cca2: 'BA',
  //     name: 'Bosnia and Herzegovina',
  //     code: '+387'
  // },
  // {
  //     cca2: 'BW',
  //     name: 'Botswana',
  //     code: '+267'
  // },
  // {
  //     cca2: 'BR',
  //     name: 'Brazil',
  //     code: '+55'
  // },
  // {
  //     cca2: 'IO',
  //     name: 'British Indian Ocean Territory',
  //     code: '+246'
  // },
  // {
  //     cca2: 'VG',
  //     name: 'British Virgin Islands',
  //     code: '+1284'
  // },
  // {
  //     cca2: 'BN',
  //     name: 'Brunei',
  //     code: '+673'
  // },
  // {
  //     cca2: 'BG',
  //     name: 'Bulgaria',
  //     code: '+359'
  // },
  // {
  //     cca2: 'BF',
  //     name: 'Burkina Faso',
  //     code: '+226'
  // },
  // {
  //     cca2: 'BI',
  //     name: 'Burundi',
  //     code: '+257'
  // },
  // {
  //     cca2: 'KH',
  //     name: 'Cambodia',
  //     code: '+855'
  // },
  // {
  //     cca2: 'CM',
  //     name: 'Cameroon',
  //     code: '+237'
  // },
  // {
  //     cca2: 'CA',
  //     name: 'Canada',
  //     code: '+1'
  // },
  // {
  //     cca2: 'CV',
  //     name: 'Cape Verde',
  //     code: '+238'
  // },
  // {
  //     cca2: 'KY',
  //     name: 'Cayman Islands',
  //     code: '+1345'
  // },
  // {
  //     cca2: 'CF',
  //     name: 'Central African Republic',
  //     code: '+236'
  // },
  // {
  //     cca2: 'TD',
  //     name: 'Chad',
  //     code: '+235'
  // },
  // {
  //     cca2: 'CL',
  //     name: 'Chile',
  //     code: '+56'
  // },
  // {
  //     cca2: 'CN',
  //     name: 'China',
  //     code: '+86'
  // },
  // {
  //     cca2: 'CX',
  //     name: 'Christmas Island',
  //     code: '+61'
  // },
  // {
  //     cca2: 'CC',
  //     name: 'Cocos Islands',
  //     code: '+61'
  // },
  // {
  //     cca2: 'CO',
  //     name: 'Colombia',
  //     code: '+57'
  // },
  // {
  //     cca2: 'KM',
  //     name: 'Comoros',
  //     code: '+269'
  // },
  // {
  //     cca2: 'CK',
  //     name: 'Cook Islands',
  //     code: '+682'
  // },
  // {
  //     cca2: 'CR',
  //     name: 'Costa Rica',
  //     code: '+506'
  // },
  // {
  //     cca2: 'HR',
  //     name: 'Croatia',
  //     code: '+385'
  // },
  // {
  //     cca2: 'CU',
  //     name: 'Cuba',
  //     code: '+53'
  // },
  // {
  //     cca2: 'CW',
  //     name: 'Curacao',
  //     code: '+599'
  // },
  // {
  //     cca2: 'CY',
  //     name: 'Cyprus',
  //     code: '+357'
  // },
  // {
  //     cca2: 'CZ',
  //     name: 'Czech Republic',
  //     code: '+420'
  // },
  // {
  //     cca2: 'CD',
  //     name: 'Democratic Republic of the Congo',
  //     code: '+243'
  // },
  // {
  //     cca2: 'DK',
  //     name: 'Denmark',
  //     code: '+45'
  // },
  // {
  //     cca2: 'DJ',
  //     name: 'Djibouti',
  //     code: '+253'
  // },
  // {
  //     cca2: 'DM',
  //     name: 'Dominica',
  //     code: '+1767'
  // },
  // {
  //     cca2: 'TL',
  //     name: 'East Timor',
  //     code: '+670'
  // },
  // {
  //     cca2: 'EC',
  //     name: 'Ecuador',
  //     code: '+593'
  // },
  // {
  //     cca2: 'EG',
  //     name: 'Egypt',
  //     code: '+20'
  // },
  // {
  //     cca2: 'SV',
  //     name: 'El Salvador',
  //     code: '+503'
  // },
  // {
  //     cca2: 'GQ',
  //     name: 'Equatorial Guinea',
  //     code: '+240'
  // },
  // {
  //     cca2: 'ER',
  //     name: 'Eritrea',
  //     code: '+291'
  // },
  // {
  //     cca2: 'EE',
  //     name: 'Estonia',
  //     code: '+372'
  // },
  // {
  //     cca2: 'ET',
  //     name: 'Ethiopia',
  //     code: '+251'
  // },
  // {
  //     cca2: 'FK',
  //     name: 'Falkland Islands',
  //     code: '+500'
  // },
  // {
  //     cca2: 'FO',
  //     name: 'Faroe Islands',
  //     code: '+298'
  // },
  // {
  //     cca2: 'FJ',
  //     name: 'Fiji',
  //     code: '+679'
  // },
  // {
  //     cca2: 'FI',
  //     name: 'Finland',
  //     code: '+358'
  // },
  // {
  //     cca2: 'FR',
  //     name: 'France',
  //     code: '+33'
  // },
  // {
  //     cca2: 'PF',
  //     name: 'French Polynesia',
  //     code: '+689'
  // },
  // {
  //     cca2: 'GA',
  //     name: 'Gabon',
  //     code: '+241'
  // },
  // {
  //     cca2: 'GM',
  //     name: 'Gambia',
  //     code: '+220'
  // },
  // {
  //     cca2: 'GE',
  //     name: 'Georgia',
  //     code: '+995'
  // },
  // {
  //     cca2: 'DE',
  //     name: 'Germany',
  //     code: '+49'
  // },
  // {
  //     cca2: 'GH',
  //     name: 'Ghana',
  //     code: '+233'
  // },
  // {
  //     cca2: 'GI',
  //     name: 'Gibraltar',
  //     code: '+350'
  // },
  // {
  //     cca2: 'GR',
  //     name: 'Greece',
  //     code: '+30'
  // },
  // {
  //     cca2: 'GL',
  //     name: 'Greenland',
  //     code: '+299'
  // },
  // {
  //     cca2: 'GD',
  //     name: 'Grenada',
  //     code: '+1473'
  // },
  // {
  //     cca2: 'GU',
  //     name: 'Guam',
  //     code: '+1671'
  // },
  // {
  //     cca2: 'GT',
  //     name: 'Guatemala',
  //     code: '+502'
  // },
  // {
  //     cca2: 'GG',
  //     name: 'Guernsey',
  //     code: '+441481'
  // },
  // {
  //     cca2: 'GN',
  //     name: 'Guinea',
  //     code: '+224'
  // },
  // {
  //     cca2: 'GW',
  //     name: 'GuineaBissau',
  //     code: '+245'
  // },
  // {
  //     cca2: 'GY',
  //     name: 'Guyana',
  //     code: '+592'
  // },
  // {
  //     cca2: 'HT',
  //     name: 'Haiti',
  //     code: '+509'
  // },
  // {
  //     cca2: 'HN',
  //     name: 'Honduras',
  //     code: '+504'
  // },
  // {
  //     cca2: 'HK',
  //     name: 'Hong Kong',
  //     code: '+852'
  // },
  // {
  //     cca2: 'HU',
  //     name: 'Hungary',
  //     code: '+36'
  // },
  // {
  //     cca2: 'IS',
  //     name: 'Iceland',
  //     code: '+354'
  // },
  // {
  //     cca2: 'IN',
  //     name: 'India',
  //     code: '+91'
  // },
  // {
  //     cca2: 'ID',
  //     name: 'Indonesia',
  //     code: '+62'
  // },
  // {
  //     cca2: 'IR',
  //     name: 'Iran',
  //     code: '+98'
  // },
  // {
  //     cca2: 'IQ',
  //     name: 'Iraq',
  //     code: '+964'
  // },
  // {
  //     cca2: 'IE',
  //     name: 'Ireland',
  //     code: '+353'
  // },
  // {
  //     cca2: 'IM',
  //     name: 'Isle of Man',
  //     code: '+441624'
  // },
  // {
  //     cca2: 'IL',
  //     name: 'Israel',
  //     code: '+972'
  // },
  // {
  //     cca2: 'IT',
  //     name: 'Italy',
  //     code: '+39'
  // },
  // {
  //     cca2: 'CI',
  //     name: 'Ivory Coast',
  //     code: '+225'
  // },
  // {
  //     cca2: 'JM',
  //     name: 'Jamaica',
  //     code: '+1876'
  // },
  // {
  //     cca2: 'JP',
  //     name: 'Japan',
  //     code: '+81'
  // },
  // {
  //     cca2: 'JE',
  //     name: 'Jersey',
  //     code: '+441534'
  // },
  // {
  //     cca2: 'JO',
  //     name: 'Jordan',
  //     code: '+962'
  // },
  // {
  //     cca2: 'KZ',
  //     name: 'Kazakhstan',
  //     code: '+7'
  // },
  // {
  //     cca2: 'KE',
  //     name: 'Kenya',
  //     code: '+254'
  // },
  // {
  //     cca2: 'KI',
  //     name: 'Kiribati',
  //     code: '+686'
  // },
  // {
  //     cca2: 'XK',
  //     name: 'Kosovo',
  //     code: '+383'
  // },
  // {
  //     cca2: 'KW',
  //     name: 'Kuwait',
  //     code: '+965'
  // },
  // {
  //     cca2: 'KG',
  //     name: 'Kyrgyzstan',
  //     code: '+996'
  // },
  // {
  //     cca2: 'LA',
  //     name: 'Laos',
  //     code: '+856'
  // },
  // {
  //     cca2: 'LV',
  //     name: 'Latvia',
  //     code: '+371'
  // },
  // {
  //     cca2: 'LB',
  //     name: 'Lebanon',
  //     code: '+961'
  // },
  // {
  //     cca2: 'LS',
  //     name: 'Lesotho',
  //     code: '+266'
  // },
  // {
  //     cca2: 'LR',
  //     name: 'Liberia',
  //     code: '+231'
  // },
  // {
  //     cca2: 'LY',
  //     name: 'Libya',
  //     code: '+218'
  // },
  // {
  //     cca2: 'LI',
  //     name: 'Liechtenstein',
  //     code: '+423'
  // },
  // {
  //     cca2: 'LT',
  //     name: 'Lithuania',
  //     code: '+370'
  // },
  // {
  //     cca2: 'LU',
  //     name: 'Luxembourg',
  //     code: '+352'
  // },
  // {
  //     cca2: 'MO',
  //     name: 'Macau',
  //     code: '+853'
  // },
  // {
  //     cca2: 'MK',
  //     name: 'Macedonia',
  //     code: '+389'
  // },
  // {
  //     cca2: 'MG',
  //     name: 'Madagascar',
  //     code: '+261'
  // },
  // {
  //     cca2: 'MW',
  //     name: 'Malawi',
  //     code: '+265'
  // },
  // {
  //     cca2: 'MY',
  //     name: 'Malaysia',
  //     code: '+60'
  // },
  // {
  //     cca2: 'MV',
  //     name: 'Maldives',
  //     code: '+960'
  // },
  // {
  //     cca2: 'ML',
  //     name: 'Mali',
  //     code: '+223'
  // },
  // {
  //     cca2: 'MT',
  //     name: 'Malta',
  //     code: '+356'
  // },
  // {
  //     cca2: 'MH',
  //     name: 'Marshall Islands',
  //     code: '+692'
  // },
  // {
  //     cca2: 'MR',
  //     name: 'Mauritania',
  //     code: '+222'
  // },
  // {
  //     cca2: 'MU',
  //     name: 'Mauritius',
  //     code: '+230'
  // },
  // {
  //     cca2: 'YT',
  //     name: 'Mayotte',
  //     code: '+262'
  // },
  // {
  //     cca2: 'MX',
  //     name: 'Mexico',
  //     code: '+52'
  // },
  // {
  //     cca2: 'FM',
  //     name: 'Micronesia',
  //     code: '+691'
  // },
  // {
  //     cca2: 'MD',
  //     name: 'Moldova',
  //     code: '+373'
  // },
  // {
  //     cca2: 'MC',
  //     name: 'Monaco',
  //     code: '+377'
  // },
  // {
  //     cca2: 'MN',
  //     name: 'Mongolia',
  //     code: '+976'
  // },
  // {
  //     cca2: 'ME',
  //     name: 'Montenegro',
  //     code: '+382'
  // },
  // {
  //     cca2: 'MS',
  //     name: 'Montserrat',
  //     code: '+1664'
  // },
  // {
  //     cca2: 'MA',
  //     name: 'Morocco',
  //     code: '+212'
  // },
  // {
  //     cca2: 'MZ',
  //     name: 'Mozambique',
  //     code: '+258'
  // },
  // {
  //     cca2: 'MM',
  //     name: 'Myanmar',
  //     code: '+95'
  // },
  // {
  //     cca2: 'NA',
  //     name: 'Namibia',
  //     code: '+264'
  // },
  // {
  //     cca2: 'NR',
  //     name: 'Nauru',
  //     code: '+674'
  // },
  // {
  //     cca2: 'NP',
  //     name: 'Nepal',
  //     code: '+977'
  // },
  // {
  //     cca2: 'NL',
  //     name: 'Netherlands',
  //     code: '+31'
  // },
  // {
  //     cca2: 'AN',
  //     name: 'Netherlands Antilles',
  //     code: '+599'
  // },
  // {
  //     cca2: 'NC',
  //     name: 'New Caledonia',
  //     code: '+687'
  // },
  // {
  //     cca2: 'NZ',
  //     name: 'New Zealand',
  //     code: '+64'
  // },
  // {
  //     cca2: 'NI',
  //     name: 'Nicaragua',
  //     code: '+505'
  // },
  // {
  //     cca2: 'NE',
  //     name: 'Niger',
  //     code: '+227'
  // },
  // {
  //     cca2: 'NG',
  //     name: 'Nigeria',
  //     code: '+234'
  // },
  // {
  //     cca2: 'NU',
  //     name: 'Niue',
  //     code: '+683'
  // },
  // {
  //     cca2: 'KP',
  //     name: 'North Korea',
  //     code: '+850'
  // },
  // {
  //     cca2: 'MP',
  //     name: 'Northern Mariana Islands',
  //     code: '+1670'
  // },
  // {
  //     cca2: 'NO',
  //     name: 'Norway',
  //     code: '+47'
  // },
  // {
  //     cca2: 'OM',
  //     name: 'Oman',
  //     code: '+968'
  // },
  {
    cca2: 'PK',
    name: 'Pakistan',
    code: '+92',
  },
  // {
  //     cca2: 'PW',
  //     name: 'Palau',
  //     code: '+680'
  // },
  // {
  //     cca2: 'PS',
  //     name: 'Palestine',
  //     code: '+970'
  // },
  // {
  //     cca2: 'PA',
  //     name: 'Panama',
  //     code: '+507'
  // },
  // {
  //     cca2: 'PG',
  //     name: 'Papua New Guinea',
  //     code: '+675'
  // },
  // {
  //     cca2: 'PY',
  //     name: 'Paraguay',
  //     code: '+595'
  // },
  // {
  //     cca2: 'PE',
  //     name: 'Peru',
  //     code: '+51'
  // },
  // {
  //     cca2: 'PH',
  //     name: 'Philippines',
  //     code: '+63'
  // },
  // {
  //     cca2: 'PN',
  //     name: 'Pitcairn',
  //     code: '+64'
  // },
  // {
  //     cca2: 'PL',
  //     name: 'Poland',
  //     code: '+48'
  // },
  // {
  //     cca2: 'PT',
  //     name: 'Portugal',
  //     code: '+351'
  // },
  // {
  //     cca2: 'PR',
  //     name: 'Puerto Rico',
  //     code: '+1787'
  // },
  // {
  //     cca2: 'QA',
  //     name: 'Qatar',
  //     code: '+974'
  // },
  // {
  //     cca2: 'CG',
  //     name: 'Republic of the Congo',
  //     code: '+242'
  // },
  // {
  //     cca2: 'RE',
  //     name: 'Reunion',
  //     code: '+262'
  // },
  // {
  //     cca2: 'RO',
  //     name: 'Romania',
  //     code: '+40'
  // },
  // {
  //     cca2: 'RU',
  //     name: 'Russia',
  //     code: '+7'
  // },
  // {
  //     cca2: 'RW',
  //     name: 'Rwanda',
  //     code: '+250'
  // },
  // {
  //     cca2: 'BL',
  //     name: 'Saint Barthelemy',
  //     code: '+590'
  // },
  // {
  //     cca2: 'SH',
  //     name: 'Saint Helena',
  //     code: '+290'
  // },
  // {
  //     cca2: 'KN',
  //     name: 'Saint Kitts and Nevis',
  //     code: '+1869'
  // },
  // {
  //     cca2: 'LC',
  //     name: 'Saint Lucia',
  //     code: '+1758'
  // },
  // {
  //     cca2: 'MF',
  //     name: 'Saint Martin',
  //     code: '+590'
  // },
  // {
  //     cca2: 'PM',
  //     name: 'Saint Pierre and Miquelon',
  //     code: '+508'
  // },
  // {
  //     cca2: 'VC',
  //     name: 'Saint Vincent and the Grenadines',
  //     code: '+1784'
  // },
  // {
  //     cca2: 'WS',
  //     name: 'Samoa',
  //     code: '+685'
  // },
  // {
  //     cca2: 'SM',
  //     name: 'San Marino',
  //     code: '+378'
  // },
  // {
  //     cca2: 'ST',
  //     name: 'Sao Tome and Principe',
  //     code: '+239'
  // },
  // {
  //     cca2: 'SA',
  //     name: 'Saudi Arabia',
  //     code: '+966'
  // },
  // {
  //     cca2: 'SN',
  //     name: 'Senegal',
  //     code: '+221'
  // },
  // {
  //     cca2: 'RS',
  //     name: 'Serbia',
  //     code: '+381'
  // },
  // {
  //     cca2: 'SC',
  //     name: 'Seychelles',
  //     code: '+248'
  // },
  // {
  //     cca2: 'SL',
  //     name: 'Sierra Leone',
  //     code: '+232'
  // },
  // {
  //     cca2: 'SG',
  //     name: 'Singapore',
  //     code: '+65'
  // },
  // {
  //     cca2: 'SX',
  //     name: 'Sint Maarten',
  //     code: '+1721'
  // },
  // {
  //     cca2: 'SK',
  //     name: 'Slovakia',
  //     code: '+421'
  // },
  // {
  //     cca2: 'SI',
  //     name: 'Slovenia',
  //     code: '+386'
  // },
  // {
  //     cca2: 'SB',
  //     name: 'Solomon Islands',
  //     code: '+677'
  // },
  // {
  //     cca2: 'SO',
  //     name: 'Somalia',
  //     code: '+252'
  // },
  // {
  //     cca2: 'ZA',
  //     name: 'South Africa',
  //     code: '+27'
  // },
  // {
  //     cca2: 'KR',
  //     name: 'South Korea',
  //     code: '+82'
  // },
  // {
  //     cca2: 'SS',
  //     name: 'South Sudan',
  //     code: '+211'
  // },
  // {
  //     cca2: 'ES',
  //     name: 'Spain',
  //     code: '+34'
  // },
  // {
  //     cca2: 'LK',
  //     name: 'Sri Lanka',
  //     code: '+94'
  // },
  // {
  //     cca2: 'SD',
  //     name: 'Sudan',
  //     code: '+249'
  // },
  // {
  //     cca2: 'SR',
  //     name: 'Suriname',
  //     code: '+597'
  // },
  // {
  //     cca2: 'SJ',
  //     name: 'Svalbard and Jan Mayen',
  //     code: '+47'
  // },
  // {
  //     cca2: 'SZ',
  //     name: 'Swaziland',
  //     code: '+268'
  // },
  // {
  //     cca2: 'SE',
  //     name: 'Sweden',
  //     code: '+46'
  // },
  // {
  //     cca2: 'CH',
  //     name: 'Switzerland',
  //     code: '+41'
  // },
  // {
  //     cca2: 'SY',
  //     name: 'Syria',
  //     code: '+963'
  // },
  // {
  //     cca2: 'TW',
  //     name: 'Taiwan',
  //     code: '+886'
  // },
  // {
  //     cca2: 'TJ',
  //     name: 'Tajikistan',
  //     code: '+992'
  // },
  // {
  //     cca2: 'TZ',
  //     name: 'Tanzania',
  //     code: '+255'
  // },
  // {
  //     cca2: 'TH',
  //     name: 'Thailand',
  //     code: '+66'
  // },
  // {
  //     cca2: 'TG',
  //     name: 'Togo',
  //     code: '+228'
  // },
  // {
  //     cca2: 'TK',
  //     name: 'Tokelau',
  //     code: '+690'
  // },
  // {
  //     cca2: 'TO',
  //     name: 'Tonga',
  //     code: '+676'
  // },
  // {
  //     cca2: 'TT',
  //     name: 'Trinidad and Tobago',
  //     code: '+1868'
  // },
  // {
  //     cca2: 'TN',
  //     name: 'Tunisia',
  //     code: '+216'
  // },
  // {
  //     cca2: 'TR',
  //     name: 'Turkey',
  //     code: '+90'
  // },
  // {
  //     cca2: 'TM',
  //     name: 'Turkmenistan',
  //     code: '+993'
  // },
  // {
  //     cca2: 'TC',
  //     name: 'Turks and Caicos Islands',
  //     code: '+1649'
  // },
  // {
  //     cca2: 'TV',
  //     name: 'Tuvalu',
  //     code: '+688'
  // },
  // {
  //     cca2: 'VI',
  //     name: 'U.S. Virgin Islands',
  //     code: '+1340'
  // },
  // {
  //     cca2: 'UG',
  //     name: 'Uganda',
  //     code: '+256'
  // },
  // {
  //     cca2: 'UA',
  //     name: 'Ukraine',
  //     code: '+380'
  // },
  // {
  //     cca2: 'AE',
  //     name: 'United Arab Emirates',
  //     code: '+971'
  // },
  // {
  //     cca2: 'GB',
  //     name: 'United Kingdom',
  //     code: '+44'
  // },
  // {
  //     cca2: 'US',
  //     name: 'United States',
  //     code: '+1'
  // },
  // {
  //     cca2: 'UY',
  //     name: 'Uruguay',
  //     code: '+598'
  // },
  // {
  //     cca2: 'UZ',
  //     name: 'Uzbekistan',
  //     code: '+998'
  // },
  // {
  //     cca2: 'VU',
  //     name: 'Vanuatu',
  //     code: '+678'
  // },
  // {
  //     cca2: 'VA',
  //     name: 'Vatican',
  //     code: '+379'
  // },
  // {
  //     cca2: 'VE',
  //     name: 'Venezuela',
  //     code: '+58'
  // },
  // {
  //     cca2: 'VN',
  //     name: 'Vietnam',
  //     code: '+84'
  // },
  // {
  //     cca2: 'WF',
  //     name: 'Wallis and Futuna',
  //     code: '+681'
  // },
  // {
  //     cca2: 'EH',
  //     name: 'Western Sahara',
  //     code: '+212'
  // },
  // {
  //     cca2: 'YE',
  //     name: 'Yemen',
  //     code: '+967'
  // },
  // {
  //     cca2: 'ZM',
  //     name: 'Zambia',
  //     code: '+260'
  // },
  // {
  //     cca2: 'ZW',
  //     name: 'Zimbabwe',
  //     code: '+263'
  // }
];

export default codes;
