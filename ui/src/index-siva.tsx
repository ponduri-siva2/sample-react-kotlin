import * as React from "react"
import {useEffect, useState, FC, ChangeEvent} from "react"
import "./index-siva.css"

interface IField {
  name:string;
  labelName:string;
  placeHolder:string;
  defaultVal:string;
}

interface IElements {
  key: string;
  value: IField[];
}

const NavFields : FC = () => {
  const [errors, setErrors] = useState<any>({});
  const [keyMapper, setKeyMapper] = useState<any>(null);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [data, setData] = useState<any>({});

  const fieldsList = () => {
    let fieldsObject: any = {};
    fieldsObject['Form1'] = [{
      name: 'field1',
      labelName: 'Email Id',
      placeHolder: 'enter valid email',
      defaultVal: '',
      required: true
    },{
      name: 'field2',
      labelName: 'Mobile no',
      placeHolder: 'enter valid phn-no',
      defaultVal: '',
      required: true
    }];
    fieldsObject['Form2'] = [{
      name: 'field3',
      labelName: 'Company',
      placeHolder: 'maxlength 20',
      defaultVal: '',
      required: true
    },{
      name: 'field4',
      labelName: 'Country',
      placeHolder: 'should not empty',
      defaultVal: '',
      required: true
    }];

    fieldsObject['Form3'] = [{
      name: 'field5',
      labelName: 'Address',
      placeHolder: 'should not empty',
      defaultVal: '',
      required: true
    },{
      name: 'field6',
      labelName: 'Postcode',
      placeHolder: 'should not empty',
      defaultVal: '',
      required: true
    }];
    return fieldsObject;
  };

  useEffect(() => { //mount
    loadFeatureData();
  },[]);

  const loadFeatureData = (): void => {
    fetch("api/formData")
        .then(response => response.json())
        .then(json => setData(json))
        .then(() => setKeyMapper(fieldsList()));
  }


  const moveTab = (val:number) : void => {
    var value = tabIndex + val;
    if(value < 0 || value > Object.keys(keyMapper).length -1) {
      return;
    } else {
      setTabIndex(value);
    }
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>): void => {
    const {name, value} = e.target;
    setData({...data, [name]:value});
  }

  const saveData = (): void => {
    fetch('api/formData/add', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => {
        if(res.status === 200) {
          alert("Data updated successfully.");
          setTabIndex(0);
          setErrors([]);
        } else {
          alert("Failed to updated.");
        }
      });
  }

  const doValidate = (): void => {
    let currentErrors:any = {};
    const validEmail = new RegExp(
      '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
   );
   const {field1, field2, field3, field4, field5, field6} = data;
   if(!validEmail.test(field1)) {
    currentErrors['Email Id'] = field1 + ' :Invalid Email';
   }
   if(isNaN(+field2) || field2.trim().length === 0 || field2.match(/\d/g).length != 10) {
    currentErrors['Mobile no'] = field2 + ' :Invalid phn number';
   }
   if(field3.trim().length > 20 || field3.trim().length === 0) {
    currentErrors['Company'] = 'Invalid field length';
   }
   if(field4.trim().length === 0) {
    currentErrors['Location'] = 'Field Empty';
   }
   if(field5.trim().length === 0) {
    currentErrors['Address'] = 'Field Empty';
   }
   if(field6.trim().length === 0) {
    currentErrors['Postcode'] = 'Field Empty';
   }
   Object.keys(currentErrors).length > 0 ? setErrors(currentErrors) : saveData();
 };

 const doRefresh = (): void => {
  loadFeatureData()
  setTabIndex(0);
  setErrors([]);
 }

 const doReset = (): void => {
    setData({field1:'',
    field2:'',
    field3:'',
    field4:'',
    field5:'',
    field6:''});
    setTabIndex(0);
    setErrors([]);
  }

  return keyMapper && (
    <div id="parent">
      <h1>Xerini-Interview</h1>
      <div>
        <ul className="node-list">
          {Object.keys(keyMapper).map((key: string, idx: number)=> (
            <li className={tabIndex === idx ? 'active' : ''}>
              <p>{key}</p>
            </li>
          ))}
        </ul>
      </div>
      <form>
        {Object.keys(keyMapper).map((key: string, idx:number)=> (tabIndex === idx && <div id={key}>
          {
            keyMapper[key].map((field:any , index: number) => (
              <div key={index}>
                <label>
                  {field.labelName}
                  <input type="text" name={field.name} value={data[field.name] || field.defaultVal} className="fields" 
                    onChange={handleChange} placeholder={field.placeHolder} required={field.required}/>
                </label>
                <br/>
            </div>
            ))
          }
        </div>))}
        {Object.keys(errors).length > 0 && <p className="errorText">
          Error in below fields...<br/>
          <ul>
            {Object.keys(errors).map((err, idx) => <li>{` ${err} - ${errors[err]} `}</li>)}
          </ul>
        </p>}
        </form>

        <div>
          <button id="prev" className="btn btn-primary" onClick={(e) =>  moveTab(-1)} disabled={tabIndex===0}>Prev</button>
          <button id="next" className="btn btn-primary" onClick={(e) =>  moveTab(1)} disabled={tabIndex===2}>Next</button>
          <button id="submit" className="btn btn-success" onClick={doValidate}>Submit</button>
          <button id="close" className="btn btn-danger" onClick={doReset}>Close</button>
          <button id="refresh" className="btn btn-secondary" onClick={doRefresh}>Refresh</button>
        </div>
    </div>
    );
  }

  export default NavFields;