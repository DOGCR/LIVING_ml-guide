"use strict";
import fs from "fs";
import path from "path";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urls = [
    "https://www.moriliving.com/en/",
    "https://www.moriliving.com/ja/",
    "https://www.moriliving.com/en/residence/",
    "https://www.moriliving.com/en/sa/",
    "https://www.moriliving.com/en/residence/azabudai_a/",
    "https://www.moriliving.com/en/residence/azabudai_gardenplaza/",
    "https://www.moriliving.com/en/residence/toranomon_rt/",
    "https://www.moriliving.com/en/residence/roppongihills/",
    "https://www.moriliving.com/en/residence/sengokuyama/",
    "https://www.moriliving.com/en/residence/motoazabu/",
    "https://www.moriliving.com/en/information/000/",
    "https://www.moriliving.com/en/search/lease/",
    "https://www.moriliving.com/en/company/",
    "https://www.moriliving.com/en/terms/",
    "https://www.moriliving.com/en/contact/lease/",
    "https://www.moriliving.com/en/contact/sale/",
    "https://www.moriliving.com/en/contact/sa/",
    "https://www.moriliving.com/ja/residence/",
    "https://www.moriliving.com/ja/sa/",
    "https://www.moriliving.com/ja/residence/azabudai_a/",
    "https://www.moriliving.com/ja/residence/azabudai_gardenplaza/",
    "https://www.moriliving.com/ja/residence/toranomon_rt/",
    "https://www.moriliving.com/ja/residence/roppongihills/",
    "https://www.moriliving.com/ja/residence/sengokuyama/",
    "https://www.moriliving.com/ja/residence/motoazabu/",
    "https://www.moriliving.com/ja/information/000/",
    "https://www.moriliving.com/ja/search/lease/",
    "https://www.moriliving.com/ja/company/",
    "https://www.moriliving.com/ja/terms/",
    "https://www.moriliving.com/ja/contact/lease/",
    "https://www.moriliving.com/ja/contact/sale/",
    "https://www.moriliving.com/ja/contact/sa/",
    "https://www.moriliving.com/en/flow/residence/",
    "https://www.moriliving.com/en/faq/residence/",
    "https://www.moriliving.com/en/residence/toranomon/",
    "https://www.moriliving.com/en/residence/arktowers/",
    "https://www.moriliving.com/en/residence/atago/",
    "https://www.moriliving.com/en/residence/omotesando_zelkova/",
    "https://www.moriliving.com/en/residence/omotesando_forestplaza/",
    "https://www.moriliving.com/en/residence/gatetower/",
    "https://www.moriliving.com/en/residence/sakurazaka/",
    "https://www.moriliving.com/en/residence/tuh/",
    "https://www.moriliving.com/en/residence/toriizaka/",
    "https://www.moriliving.com/en/residence/akasaka_toh/",
    "https://www.moriliving.com/en/residence/akasaka/",
    "https://www.moriliving.com/en/residence/shoto/",
    "https://www.moriliving.com/en/residence/hirakawa/",
    "https://www.moriliving.com/en/residence/arkforest/",
    "https://www.moriliving.com/en/residence/firstplaza/",
    "https://www.moriliving.com/en/residence/arkhillsfronttower_rop/",
    "https://www.moriliving.com/en/residence/arkexecutive_rop/",
    "https://www.moriliving.com/en/residence/hollandhills_rop/",
    "https://www.moriliving.com/en/flow/sa/",
    "https://www.moriliving.com/en/faq/sa/",
    "https://www.moriliving.com/en/sa/toranomon_rt/",
    "https://www.moriliving.com/en/sa/roppongihills/",
    "https://www.moriliving.com/en/sa/atago/",
    "https://www.moriliving.com/en/sa/arktowers/",
    "https://www.moriliving.com/en/residence/azabudai_a/location/",
    "https://www.moriliving.com/en/residence/azabudai_a/design/",
    "https://www.moriliving.com/en/residence/azabudai_a/services_amenities/",
    "https://www.moriliving.com/en/residence/azabudai_a/safety_security/",
    "https://www.moriliving.com/en/residence/azabudai_a/general_info/",
    "https://www.moriliving.com/en/residence/azabudai_gardenplaza/location/",
    "https://www.moriliving.com/en/residence/azabudai_gardenplaza/design/",
    "https://www.moriliving.com/en/residence/azabudai_gardenplaza/services_amenities/",
    "https://www.moriliving.com/en/residence/azabudai_gardenplaza/safety_security/",
    "https://www.moriliving.com/en/residence/azabudai_gardenplaza/general_info/",
    "https://www.moriliving.com/en/residence/toranomon_rt/location/",
    "https://www.moriliving.com/en/residence/toranomon_rt/design/",
    "https://www.moriliving.com/en/residence/toranomon_rt/services_amenities/",
    "https://www.moriliving.com/en/residence/toranomon_rt/safety_security/",
    "https://www.moriliving.com/en/residence/toranomon_rt/general_info/",
    "https://www.moriliving.com/en/residence/roppongihills/location/",
    "https://www.moriliving.com/en/residence/roppongihills/design/",
    "https://www.moriliving.com/en/residence/roppongihills/services_amenities/",
    "https://www.moriliving.com/en/residence/roppongihills/safety_security/",
    "https://www.moriliving.com/en/residence/roppongihills/general_info/",
    "https://www.moriliving.com/en/residence/sengokuyama/location/",
    "https://www.moriliving.com/en/residence/sengokuyama/design/",
    "https://www.moriliving.com/en/residence/sengokuyama/services_amenities/",
    "https://www.moriliving.com/en/residence/sengokuyama/safety_security/",
    "https://www.moriliving.com/en/residence/sengokuyama/general_info/",
    "https://www.moriliving.com/en/residence/motoazabu/location/",
    "https://www.moriliving.com/en/residence/motoazabu/design/",
    "https://www.moriliving.com/en/residence/motoazabu/services_amenities/",
    "https://www.moriliving.com/en/residence/motoazabu/safety_security/",
    "https://www.moriliving.com/en/residence/motoazabu/general_info/",
    "https://www.moriliving.com/ja/flow/residence/",
    "https://www.moriliving.com/ja/faq/residence/",
    "https://www.moriliving.com/ja/residence/toranomon/",
    "https://www.moriliving.com/ja/residence/arktowers/",
    "https://www.moriliving.com/ja/residence/atago/",
    "https://www.moriliving.com/ja/residence/omotesando_zelkova/",
    "https://www.moriliving.com/ja/residence/omotesando_forestplaza/",
    "https://www.moriliving.com/ja/residence/gatetower/",
    "https://www.moriliving.com/ja/residence/sakurazaka/",
    "https://www.moriliving.com/ja/residence/tuh/",
    "https://www.moriliving.com/ja/residence/toriizaka/",
    "https://www.moriliving.com/ja/residence/akasaka_toh/",
    "https://www.moriliving.com/ja/residence/akasaka/",
    "https://www.moriliving.com/ja/residence/shoto/",
    "https://www.moriliving.com/ja/residence/hirakawa/",
    "https://www.moriliving.com/ja/residence/arkforest/",
    "https://www.moriliving.com/ja/residence/firstplaza/",
    "https://www.moriliving.com/ja/residence/arkhillsfronttower_rop/",
    "https://www.moriliving.com/ja/residence/arkexecutive_rop/",
    "https://www.moriliving.com/ja/residence/hollandhills_rop/",
    "https://www.moriliving.com/ja/flow/sa/",
    "https://www.moriliving.com/ja/faq/sa/",
    "https://www.moriliving.com/ja/sa/toranomon_rt/",
    "https://www.moriliving.com/ja/sa/roppongihills/",
    "https://www.moriliving.com/ja/sa/atago/",
    "https://www.moriliving.com/ja/sa/arktowers/",
    "https://www.moriliving.com/ja/residence/azabudai_a/location/",
    "https://www.moriliving.com/ja/residence/azabudai_a/design/",
    "https://www.moriliving.com/ja/residence/azabudai_a/services_amenities/",
    "https://www.moriliving.com/ja/residence/azabudai_a/safety_security/",
    "https://www.moriliving.com/ja/residence/azabudai_a/general_info/",
    "https://www.moriliving.com/ja/residence/azabudai_gardenplaza/location/",
    "https://www.moriliving.com/ja/residence/azabudai_gardenplaza/design/",
    "https://www.moriliving.com/ja/residence/azabudai_gardenplaza/services_amenities/",
    "https://www.moriliving.com/ja/residence/azabudai_gardenplaza/safety_security/",
    "https://www.moriliving.com/ja/residence/azabudai_gardenplaza/general_info/",
    "https://www.moriliving.com/ja/residence/toranomon_rt/location/",
    "https://www.moriliving.com/ja/residence/toranomon_rt/design/",
    "https://www.moriliving.com/ja/residence/toranomon_rt/services_amenities/",
    "https://www.moriliving.com/ja/residence/toranomon_rt/safety_security/",
    "https://www.moriliving.com/ja/residence/toranomon_rt/general_info/",
    "https://www.moriliving.com/ja/residence/roppongihills/location/",
    "https://www.moriliving.com/ja/residence/roppongihills/design/",
    "https://www.moriliving.com/ja/residence/roppongihills/services_amenities/",
    "https://www.moriliving.com/ja/residence/roppongihills/safety_security/",
    "https://www.moriliving.com/ja/residence/roppongihills/general_info/",
    "https://www.moriliving.com/ja/residence/sengokuyama/location/",
    "https://www.moriliving.com/ja/residence/sengokuyama/design/",
    "https://www.moriliving.com/ja/residence/sengokuyama/services_amenities/",
    "https://www.moriliving.com/ja/residence/sengokuyama/safety_security/",
    "https://www.moriliving.com/ja/residence/sengokuyama/general_info/",
    "https://www.moriliving.com/ja/residence/motoazabu/location/",
    "https://www.moriliving.com/ja/residence/motoazabu/design/",
    "https://www.moriliving.com/ja/residence/motoazabu/services_amenities/",
    "https://www.moriliving.com/ja/residence/motoazabu/safety_security/",
    "https://www.moriliving.com/ja/residence/motoazabu/general_info/",
    "https://www.moriliving.com/en/residence/toranomon/location/",
    "https://www.moriliving.com/en/residence/toranomon/design/",
    "https://www.moriliving.com/en/residence/toranomon/services_amenities/",
    "https://www.moriliving.com/en/residence/toranomon/safety_security/",
    "https://www.moriliving.com/en/residence/toranomon/general_info/",
    "https://www.moriliving.com/en/residence/arktowers/location/",
    "https://www.moriliving.com/en/residence/arktowers/services_amenities/",
    "https://www.moriliving.com/en/residence/arktowers/safety_security/",
    "https://www.moriliving.com/en/residence/arktowers/general_info/",
    "https://www.moriliving.com/en/residence/atago/location/",
    "https://www.moriliving.com/en/residence/atago/services_amenities/",
    "https://www.moriliving.com/en/residence/atago/safety_security/",
    "https://www.moriliving.com/en/residence/atago/general_info/",
    "https://www.moriliving.com/en/residence/omotesando_zelkova/location/",
    "https://www.moriliving.com/en/residence/omotesando_zelkova/design/",
    "https://www.moriliving.com/en/residence/omotesando_zelkova/safety_security/",
    "https://www.moriliving.com/en/residence/omotesando_zelkova/general_info/",
    "https://www.moriliving.com/en/residence/omotesando_forestplaza/location/",
    "https://www.moriliving.com/en/residence/omotesando_forestplaza/safety_security/",
    "https://www.moriliving.com/en/residence/omotesando_forestplaza/general_info/",
    "https://www.moriliving.com/en/residence/gatetower/location/",
    "https://www.moriliving.com/en/residence/gatetower/services_amenities/",
    "https://www.moriliving.com/en/residence/gatetower/safety_security/",
    "https://www.moriliving.com/en/residence/gatetower/general_info/",
    "https://www.moriliving.com/en/residence/sakurazaka/location/",
    "https://www.moriliving.com/en/residence/sakurazaka/services_amenities/",
    "https://www.moriliving.com/en/residence/sakurazaka/safety_security/",
    "https://www.moriliving.com/en/residence/sakurazaka/general_info/",
    "https://www.moriliving.com/en/residence/tuh/location/",
    "https://www.moriliving.com/en/residence/tuh/services_amenities/",
    "https://www.moriliving.com/en/residence/tuh/safety_security/",
    "https://www.moriliving.com/en/residence/tuh/general_info/",
    "https://www.moriliving.com/en/residence/toriizaka/location/",
    "https://www.moriliving.com/en/residence/toriizaka/services_amenities/",
    "https://www.moriliving.com/en/residence/toriizaka/safety_security/",
    "https://www.moriliving.com/en/residence/toriizaka/general_info/",
    "https://www.moriliving.com/en/residence/akasaka_toh/location/",
    "https://www.moriliving.com/en/residence/akasaka_toh/services_amenities/",
    "https://www.moriliving.com/en/residence/akasaka_toh/safety_security/",
    "https://www.moriliving.com/en/residence/akasaka_toh/general_info/",
    "https://www.moriliving.com/en/residence/akasaka/location/",
    "https://www.moriliving.com/en/residence/akasaka/services_amenities/",
    "https://www.moriliving.com/en/residence/akasaka/safety_security/",
    "https://www.moriliving.com/en/residence/akasaka/general_info/",
    "https://www.moriliving.com/en/residence/shoto/location/",
    "https://www.moriliving.com/en/residence/shoto/services_amenities/",
    "https://www.moriliving.com/en/residence/shoto/safety_security/",
    "https://www.moriliving.com/en/residence/shoto/general_info/",
    "https://www.moriliving.com/en/residence/hirakawa/location/",
    "https://www.moriliving.com/en/residence/hirakawa/services_amenities/",
    "https://www.moriliving.com/en/residence/hirakawa/safety_security/",
    "https://www.moriliving.com/en/residence/hirakawa/general_info/",
    "https://www.moriliving.com/en/residence/arkforest/location/",
    "https://www.moriliving.com/en/residence/arkforest/safety_security/",
    "https://www.moriliving.com/en/residence/arkforest/general_info/",
    "https://www.moriliving.com/en/residence/firstplaza/location/",
    "https://www.moriliving.com/en/residence/firstplaza/safety_security/",
    "https://www.moriliving.com/en/residence/firstplaza/general_info/",
    "https://www.moriliving.com/en/residence/arkhillsfronttower_rop/location/",
    "https://www.moriliving.com/en/residence/arkhillsfronttower_rop/safety_security/",
    "https://www.moriliving.com/en/residence/arkhillsfronttower_rop/general_info/",
    "https://www.moriliving.com/en/residence/arkexecutive_rop/location/",
    "https://www.moriliving.com/en/residence/arkexecutive_rop/safety_security/",
    "https://www.moriliving.com/en/residence/arkexecutive_rop/general_info/",
    "https://www.moriliving.com/en/residence/hollandhills_rop/location/",
    "https://www.moriliving.com/en/residence/hollandhills_rop/safety_security/",
    "https://www.moriliving.com/en/residence/hollandhills_rop/general_info/",
    "https://www.moriliving.com/en/sa/toranomon_rt/roomplan/",
    "https://www.moriliving.com/en/sa/toranomon_rt/services_amenities/",
    "https://www.moriliving.com/en/sa/toranomon_rt/location/",
    "https://www.moriliving.com/en/sa/toranomon_rt/design/",
    "https://www.moriliving.com/en/sa/toranomon_rt/safety_security/",
    "https://www.moriliving.com/en/sa/toranomon_rt/general_info/",
    "https://www.moriliving.com/en/sa/roppongihills/roomplan/",
    "https://www.moriliving.com/en/sa/roppongihills/services_amenities/",
    "https://www.moriliving.com/en/sa/roppongihills/location/",
    "https://www.moriliving.com/en/sa/roppongihills/design/",
    "https://www.moriliving.com/en/sa/roppongihills/safety_security/",
    "https://www.moriliving.com/en/sa/roppongihills/general_info/",
    "https://www.moriliving.com/en/sa/atago/roomplan/",
    "https://www.moriliving.com/en/sa/atago/services_amenities/",
    "https://www.moriliving.com/en/sa/atago/location/",
    "https://www.moriliving.com/en/sa/atago/safety_security/",
    "https://www.moriliving.com/en/sa/atago/general_info/",
    "https://www.moriliving.com/en/sa/arktowers/roomplan/",
    "https://www.moriliving.com/en/sa/arktowers/services_amenities/",
    "https://www.moriliving.com/en/sa/arktowers/location/",
    "https://www.moriliving.com/en/sa/arktowers/safety_security/",
    "https://www.moriliving.com/en/sa/arktowers/general_info/",
    "https://www.moriliving.com/ja/residence/toranomon/location/",
    "https://www.moriliving.com/ja/residence/toranomon/design/",
    "https://www.moriliving.com/ja/residence/toranomon/services_amenities/",
    "https://www.moriliving.com/ja/residence/toranomon/safety_security/",
    "https://www.moriliving.com/ja/residence/toranomon/general_info/",
    "https://www.moriliving.com/ja/residence/arktowers/location/",
    "https://www.moriliving.com/ja/residence/arktowers/services_amenities/",
    "https://www.moriliving.com/ja/residence/arktowers/safety_security/",
    "https://www.moriliving.com/ja/residence/arktowers/general_info/",
    "https://www.moriliving.com/ja/residence/atago/location/",
    "https://www.moriliving.com/ja/residence/atago/services_amenities/",
    "https://www.moriliving.com/ja/residence/atago/safety_security/",
    "https://www.moriliving.com/ja/residence/atago/general_info/",
    "https://www.moriliving.com/ja/residence/omotesando_zelkova/location/",
    "https://www.moriliving.com/ja/residence/omotesando_zelkova/design/",
    "https://www.moriliving.com/ja/residence/omotesando_zelkova/safety_security/",
    "https://www.moriliving.com/ja/residence/omotesando_zelkova/general_info/",
    "https://www.moriliving.com/ja/residence/omotesando_forestplaza/location/",
    "https://www.moriliving.com/ja/residence/omotesando_forestplaza/safety_security/",
    "https://www.moriliving.com/ja/residence/omotesando_forestplaza/general_info/",
    "https://www.moriliving.com/ja/residence/gatetower/location/",
    "https://www.moriliving.com/ja/residence/gatetower/services_amenities/",
    "https://www.moriliving.com/ja/residence/gatetower/safety_security/",
    "https://www.moriliving.com/ja/residence/gatetower/general_info/",
    "https://www.moriliving.com/ja/residence/sakurazaka/location/",
    "https://www.moriliving.com/ja/residence/sakurazaka/services_amenities/",
    "https://www.moriliving.com/ja/residence/sakurazaka/safety_security/",
    "https://www.moriliving.com/ja/residence/sakurazaka/general_info/",
    "https://www.moriliving.com/ja/residence/tuh/location/",
    "https://www.moriliving.com/ja/residence/tuh/services_amenities/",
    "https://www.moriliving.com/ja/residence/tuh/safety_security/",
    "https://www.moriliving.com/ja/residence/tuh/general_info/",
    "https://www.moriliving.com/ja/residence/toriizaka/location/",
    "https://www.moriliving.com/ja/residence/toriizaka/services_amenities/",
    "https://www.moriliving.com/ja/residence/toriizaka/safety_security/",
    "https://www.moriliving.com/ja/residence/toriizaka/general_info/",
    "https://www.moriliving.com/ja/residence/akasaka_toh/location/",
    "https://www.moriliving.com/ja/residence/akasaka_toh/services_amenities/",
    "https://www.moriliving.com/ja/residence/akasaka_toh/safety_security/",
    "https://www.moriliving.com/ja/residence/akasaka_toh/general_info/",
    "https://www.moriliving.com/ja/residence/akasaka/location/",
    "https://www.moriliving.com/ja/residence/akasaka/services_amenities/",
    "https://www.moriliving.com/ja/residence/akasaka/safety_security/",
    "https://www.moriliving.com/ja/residence/akasaka/general_info/",
    "https://www.moriliving.com/ja/residence/shoto/location/",
    "https://www.moriliving.com/ja/residence/shoto/services_amenities/",
    "https://www.moriliving.com/ja/residence/shoto/safety_security/",
    "https://www.moriliving.com/ja/residence/shoto/general_info/",
    "https://www.moriliving.com/ja/residence/hirakawa/location/",
    "https://www.moriliving.com/ja/residence/hirakawa/services_amenities/",
    "https://www.moriliving.com/ja/residence/hirakawa/safety_security/",
    "https://www.moriliving.com/ja/residence/hirakawa/general_info/",
    "https://www.moriliving.com/ja/residence/arkforest/location/",
    "https://www.moriliving.com/ja/residence/arkforest/safety_security/",
    "https://www.moriliving.com/ja/residence/arkforest/general_info/",
    "https://www.moriliving.com/ja/residence/firstplaza/location/",
    "https://www.moriliving.com/ja/residence/firstplaza/safety_security/",
    "https://www.moriliving.com/ja/residence/firstplaza/general_info/",
    "https://www.moriliving.com/ja/residence/arkhillsfronttower_rop/location/",
    "https://www.moriliving.com/ja/residence/arkhillsfronttower_rop/safety_security/",
    "https://www.moriliving.com/ja/residence/arkhillsfronttower_rop/general_info/",
    "https://www.moriliving.com/ja/residence/arkexecutive_rop/location/",
    "https://www.moriliving.com/ja/residence/arkexecutive_rop/safety_security/",
    "https://www.moriliving.com/ja/residence/arkexecutive_rop/general_info/",
    "https://www.moriliving.com/ja/residence/hollandhills_rop/location/",
    "https://www.moriliving.com/ja/residence/hollandhills_rop/safety_security/",
    "https://www.moriliving.com/ja/residence/hollandhills_rop/general_info/",
    "https://www.moriliving.com/ja/sa/toranomon_rt/roomplan/",
    "https://www.moriliving.com/ja/sa/toranomon_rt/services_amenities/",
    "https://www.moriliving.com/ja/sa/toranomon_rt/location/",
    "https://www.moriliving.com/ja/sa/toranomon_rt/design/",
    "https://www.moriliving.com/ja/sa/toranomon_rt/safety_security/",
    "https://www.moriliving.com/ja/sa/toranomon_rt/general_info/",
    "https://www.moriliving.com/ja/sa/roppongihills/roomplan/",
    "https://www.moriliving.com/ja/sa/roppongihills/services_amenities/",
    "https://www.moriliving.com/ja/sa/roppongihills/location/",
    "https://www.moriliving.com/ja/sa/roppongihills/design/",
    "https://www.moriliving.com/ja/sa/roppongihills/safety_security/",
    "https://www.moriliving.com/ja/sa/roppongihills/general_info/",
    "https://www.moriliving.com/ja/sa/atago/roomplan/",
    "https://www.moriliving.com/ja/sa/atago/services_amenities/",
    "https://www.moriliving.com/ja/sa/atago/location/",
    "https://www.moriliving.com/ja/sa/atago/safety_security/",
    "https://www.moriliving.com/ja/sa/atago/general_info/",
    "https://www.moriliving.com/ja/sa/arktowers/roomplan/",
    "https://www.moriliving.com/ja/sa/arktowers/services_amenities/",
    "https://www.moriliving.com/ja/sa/arktowers/location/",
    "https://www.moriliving.com/ja/sa/arktowers/safety_security/",
    "https://www.moriliving.com/ja/sa/arktowers/general_info/"
];
const configs = [
  {
    name: "desktop",
    preset: "desktop",
    options: { output: "html", onlyCategories: ["performance", "accessibility", "seo"] },
  },
  {
    name: "mobile_fast",
    preset: "mobile",
    options: {
      output: "html",
      throttling: {
        cpuSlowdownMultiplier: 4,
        rttMs: 40,
        throughputKbps: 10240,
      },
      onlyCategories: ["performance", "accessibility", "seo"],
    },
  },
  {
    name: "mobile_slow",
    preset: "mobile",
    options: {
      output: "html",
      throttling: {
        cpuSlowdownMultiplier: 6,
        rttMs: 150,
        throughputKbps: 1600,
      },
      onlyCategories: ["performance", "accessibility", "seo"],
    },
  },
];

async function runLighthouse(url, config) {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless", "--incognito", "--window-size=1280,720"]
  });

  const options = {
    port: chrome.port,
    output: 'html',
    onlyCategories: ['performance', 'accessibility', 'seo'],
    emulatedFormFactor: 'desktop',
    throttling: {
      cpuSlowdownMultiplier: 1,
      rttMs: 40,
      throughputKbps: 10240,
    },
    disableStorageReset: true
  };

  const runnerResult = await lighthouse(url, options);

  const reportHtml = runnerResult.report;
  const folder = path.resolve(__dirname, config.name);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  const filePath = path.resolve(folder, `${url.replace(/[^a-z0-9]/gi, "_")}.html`);
  fs.writeFileSync(filePath, reportHtml);

  await chrome.kill();
  return {
    url,
    score: runnerResult.lhr.categories.performance.score * 100,
    accessibility: runnerResult.lhr.categories.accessibility.score * 100,
    seo: runnerResult.lhr.categories.seo.score * 100,
    filePath,
  };
}

async function run() {
  const results = [];

  for (const config of configs) {
    for (const url of urls) {
      console.log(`Running Lighthouse for ${url} on ${config.name}...`);
      const result = await runLighthouse(url, config);
      results.push({ ...result, device: config.name });
    }
  }

  // スコア一覧のHTMLレポートを生成
  generateSummaryReport(results);
}

function generateSummaryReport(results) {
  let htmlContent = `
  <html>
  <head>
    <title>Lighthouse Results</title>
    <style>
      table { border-collapse: collapse; width: 100%; }
      th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      th { background-color: #f4f4f4; }
    </style>
  </head>
  <body>
    <h1>Lighthouse Results</h1>
    <table>
      <tr>
        <th>URL</th>
        <th>Device</th>
        <th>Performance</th>
        <th>Accessibility</th>
        <th>SEO</th>
        <th>Report</th>
      </tr>
  `;

  results.forEach((result) => {
    htmlContent += `
      <tr>
        <td><a href="${result.url}" target="_blank">${result.url}</a></td>
        <td>${result.device}</td>
        <td>${result.score}</td>
        <td>${result.accessibility}</td>
        <td>${result.seo}</td>
        <td><a href="${result.filePath}" target="_blank">View Report</a></td>
      </tr>
    `;
  });

  htmlContent += `
    </table>
  </body>
  </html>
  `;

  fs.writeFileSync(path.resolve(__dirname, "summary.html"), htmlContent);
  console.log("Summary report generated: summary.html");
}

run();