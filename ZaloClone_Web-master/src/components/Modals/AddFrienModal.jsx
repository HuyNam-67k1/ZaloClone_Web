import React, { useContext, useState } from "react";
import { Modal, Select, Spin, Avatar, Form } from "antd";
import { AppContext } from "../../context/AppProvider";
import { User } from "../../models";
import { debounce, set } from "lodash";
import { Auth, DataStore } from "aws-amplify";

function AddFriendModal() {
  const { isAddFriendVisible, setisAddFriendVisible } = useContext(AppContext);
  const [value, setValue] = useState([]);
  const [useradd, setuseradd] = useState({});
  const [form] = Form.useForm();

  function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = React.useMemo(() => {
      const loadOptions = (value) => {
        setOptions([]);
        setFetching(true);

        fetchOptions(value).then((newOptions) => {
          setOptions(newOptions);
          setFetching(false);
        });
      };
      return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions]);

    React.useEffect(() => {
      return () => {
        // clear when unmount
        setOptions([]);
      };
    }, []);
    return (
      <Select
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
      >
        {options.map((opt) => (
          <Select.Option key={opt.id} value={opt.id} title={opt.name}>
            <Avatar size="small" src={opt.imageUri}>
              {opt.imageUri ? "" : opt.name?.charAt(0)?.toUpperCase()}
            </Avatar>
            {` ${opt.name}`}
          </Select.Option>
        ))}
      </Select>
    );
  }

  async function fetchUserList(search) {
    const fetchUser = (await DataStore.query(User)).filter(
      (User) => User.name === search
    );
    //  ).map((doc)=>({
    //   label: doc.name,
    //   value: doc.id,
    //   imageUri: doc.imageUri,
    // }));

    // const UseraddA= (await DataStore.query(User)).filter(
    //   (User) => User.name === search
    //  ).then(setuseradd);

    // console.log(fetchUser);
    console.log(useradd);
    return fetchUser;
  }

  const handleOk = () => {
    //Connect current user to the chat room
    // const authUser = await Auth.currentAuthenticatedUser();
    // const dbUser = await DataStore.query(User, authUser.attributes.sub); //query by id
    // await DataStore.save(
    //   new ChatRoomUser({
    //     user: dbUser,
    //     chatRoom: newChatRoom,
    //   })
    // );

    // //Connect clicked user to the chat room
    // await DataStore.save(
    //   new ChatRoomUser({
    //     user,
    //     chatRoom: newChatRoom,
    //   })
    // );
    setisAddFriendVisible(false);
  };

  const handleCancel = () => {
    setisAddFriendVisible(false);
  };

  return (
    <div>
      <Modal
        title="Thêm Bạn"
        open={isAddFriendVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            name="search-user"
            label="Tên bạn mới"
            value={value}
            placeholder="Nhập tên bạn cần tìm"
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: "100%" }}
          />
        </Form>
      </Modal>
    </div>
  );
}

export default AddFriendModal;
