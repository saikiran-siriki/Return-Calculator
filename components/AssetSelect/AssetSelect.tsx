import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Image from "next/image";
import { AllCoins, CoinData } from "../../interfaces/assets";
import { symbolName } from "typescript";
import styles from "./AssetSelect.module.scss";
import { useRouter } from "next/router";
import { isValidQuery } from "../../utils/helpers";

export default function AssetSelect({ assetData }: { assetData: AllCoins }) {
  const [coin, setCoin] = useState<CoinData>({
    id: "",
    image: "",
    current_price: 0,
    name: "",
    symbol: "",
  });
  const Router = useRouter();
  const { asset } = Router.query;

  useEffect(() => {
    if (isValidQuery(asset)) {
      setCoin(assetData.filter((item) => item.id === asset)[0]);
    }
  }, [assetData, asset]);

  const handleChange = (event: SelectChangeEvent) => {
    setCoin(assetData.filter((item) => item.id === event.target.value)[0]);
    Router.push(
      {
        pathname: `/`,
        query: {
          asset: event.target.value,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div>
      {assetData.length > 0 && isValidQuery(asset) && (
        <div className={styles.assetselect_container}>
          <div className={styles.assetimage}>
            <Image src={coin?.image} alt={coin?.name} width={30} height={30} />
          </div>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={asset as string}
              onChange={handleChange}
              label="Coin"
              autoWidth
              renderValue={() => (
                <div className={styles.renderValue}>{coin?.name}</div>
              )}
              defaultValue={assetData[0].id}
              sx={{
                height: '2.5rem',
                color: 'var(--inverted-3)',
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--inverted-2)'
                },
                '& .MuiSvgIcon-root': {
                    color: 'var(--inverted-2)'
                }
            }}
            >
              {assetData.map(({ id, name, image, symbol }) => {
                return (
                  <MenuItem key={id} value={id}>
                    <Image src={image} alt={name} width={40} height={40} />
                    <div className={styles.textcontainer}>
                      <small className={styles.textcontainer__symbol}>
                        {symbol.toUpperCase()}
                      </small>
                      <div className={styles.textcontainer__name}>
                        {name.toUpperCase()}
                      </div>
                    </div>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      )}
    </div>
  );
}