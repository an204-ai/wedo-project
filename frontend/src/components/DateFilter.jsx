import { options} from "@/lib/data";
import { Button } from "./ui/button";
import {useState} from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./ui/combobox";

const DateFilter = ({dateQuery, setDateQuery}) => {
    
    return (
    <Combobox items={options} onValueChange={setDateQuery} value={options.find(item=>item.key === dateQuery)?.label}>
    <ComboboxInput placeholder="Chọn thời gian..." />
    <ComboboxContent>
        <ComboboxEmpty>Không tìm thấy.</ComboboxEmpty>
        <ComboboxList>
        {options.map((item) => (
            <ComboboxItem
            key={item.key}
            value={item.key}
            >
            {item.label}
            </ComboboxItem>
        ))}
        </ComboboxList>
    </ComboboxContent>  
    </Combobox>
    );
};
export default DateFilter;