import * as React from "react"
import {useEffect, useState} from "react"
require('./index-siva.css')

function NavFields() {


  const [errors, setErrors] = useState<any>({});
  const [keyMapper, setKeyMapper] = useState<any>(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [data, setData] = useState<any>({
    field1:'',
    field2:'',
    field3:'',
    field4:'',
    field5:'',
    field6:''
  });

  const fieldsList = () => {
    let fieldsObject: any = {};
    fieldsObject['Form1'] = [{
      name: 'field1',
      labelName: 'Email',
      placeholder: 'enter valid email',
      defaultVal: ''
    },{
      name: 'field2',
      labelName: 'Phn',
      placeholder: 'enter valid phn-no',
      defaultVal: ''
    }];

    fieldsObject['Form2'] = [{
      name: 'field3',
      labelName: 'Field3',
      placeholder: 'maxlength 20',
      defaultVal: ''
    },{
      name: 'field4',
      labelName: 'Field4',
      placeholder: 'should not empty',
      defaultVal: ''
    }];

    fieldsObject['Form3'] = [{
      name: 'field5',
      labelName: 'Field5',
      placeholder: 'should not empty',
      defaultVal: ''
    },{
      name: 'field6',
      labelName: 'Field6',
      placeholder: 'should not empty',
      defaultVal: ''
    }];
    return fieldsObject;
  };

  useEffect(() => {
    setKeyMapper(fieldsList());
  }, []);


  const moveTab = (val:number) => {
    debugger;
    var value = tabIndex + val;
    if(value < 0 || value > 2) {
      return;
    } else {
      setTabIndex(value);
    }
  }

  const handleChange = (e:any) => {
    const {name, value} = e.target;
    setData({...data, [name]:value});
  }

  const saveData = () => {
    //POST api call to save data
    reset();
    console.table(data);
    alert('Data added');
  }

  const validate = () => {
    let currentErrors:any = {};
    const validEmail = new RegExp(
      '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
   );
   const {field1, field2, field3, field4, field5, field6} = data;
   if(!validEmail.test(field1)) {
    currentErrors['Email'] = field1 + ' :Invalid Email';
   }
   if(field2.trim().length === 0 || field2.match(/\d/g).length != 10 || isNaN(+field2)) {
    currentErrors['Phn'] = field2 + ' :Invalid phn number';
   }
   if(field3.trim().length > 20 || field3.trim().length === 0) {
    currentErrors['Field3'] = 'Invalid field length';
   }
   if(field4.trim().length === 0) {
    currentErrors['Field4'] = 'Field Empty';
   }
   if(field5.trim().length === 0) {
    currentErrors['Field5'] = 'Field Empty';
   }
   if(field6.trim().length === 0) {
    currentErrors['Field6'] = 'Field Empty';
   }
   Object.keys(currentErrors).length > 0 ? setErrors(currentErrors) : saveData();
 };

 const reset = () => {
  setData({field1:'',
  field2:'',
  field3:'',
  field4:'',
  field5:'',
  field6:''});
  setTabIndex(0);
  setErrors([]);
};

    return keyMapper && (
    <div id="parent">
      <h1>Xerini-Interview</h1>
      <div>
        <ul className="node-list">
          {Object.keys(keyMapper).map((key, idx)=> (
            <li className={tabIndex === idx ? 'active' : ''}>
              <p>{key}</p>
            </li>
          ))}
        </ul>
      </div>
      <form>
        {Object.keys(keyMapper).map((key, idx)=> (tabIndex === idx && <div id={key}>
          {
            keyMapper[key].map((field:any , index: number) => (
              <div key={index}>
                <label>
                  {field.labelName}
                  <input type="text" name={field.name} value={data[field.name] || field.defaultVal} className="fields" onChange={handleChange} placeholder={field.placeholder}/>
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
          <button id="submit" className="btn btn-success" onClick={validate}>Submit</button>
          <button id="close" className="btn btn-danger" onClick={reset}>Close</button>
        </div>
    </div>
    );
  }

  export default NavFields;